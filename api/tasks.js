const { CACHE, graph: { org: { tenantId } } } = require('../config')
const getGraphUser = require('../lib/get-graph-user')
const getGraphOrg = require('../lib/get-graph-org')
const getVismaTasks = require('../lib/get-visma-tasks')
const logger = require('../lib/logger')

const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

module.exports = async (req, res) => {
  const token = req.headers.authorization || null
  if (!token) {
    res.status(401).json({ error: 'Missing authorization header' })
    return
  }

  let samAccountName, graphUser, graphOrg

  try {
    graphUser = await getGraphUser(token)
    samAccountName = graphUser.onPremisesSamAccountName
    if (!graphUser || !samAccountName) {
      logger('warn', ['tasks', 'No user found'])
      res.status(404).json({ error: 'No user found' })
      return
    }
  } catch (err) {
    logger('error', ['tasks', 'graph-user', 'err', err])
    res.status(500).json({ error: err.message })
    return
  }

  try {
    graphOrg = await getGraphOrg(token)
    const userTenantId = graphOrg.value[0].id
    if (userTenantId !== tenantId) {
      logger('error', ['tasks', `Tenant ID not matching ${tenantId}`, userTenantId])
      res.status(401).json({ error: 'Invalid tenant id' })
      return
    }
  } catch (err) {
    logger('error', ['tasks', 'graph-org', 'err', err])
    res.status(500).json({ error: err.message })
    return
  }

  logger('info', ['tasks', samAccountName])

  if (cache) {
    const cachedUserTasks = cache.get(samAccountName)
    if (cachedUserTasks) {
      res.status(200).json(cachedUserTasks)
      return
    }
  }

  try {
    const vismaTasks = await getVismaTasks(samAccountName)
    const payload = {
      user: graphUser,
      tasks: [...vismaTasks]
    }

    logger('info', ['tasks', samAccountName, 'tasks', payload.tasks.length])

    if (cache) {
      cache.set(samAccountName, payload)
    }

    res.status(200).json(payload)
  } catch (err) {
    logger('error', ['tasks', samAccountName, 'err', err])
    res.status(500).json({ error: err.message })
  }
}
