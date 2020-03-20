const axios = require('axios')
const logger = require('./logger')
const repackVisma = require('./repack-visma-tasks')
const { visma } = require('../config')

module.exports = async username => {
  const options = {
    url: `${visma.url}${username}`,
    method: 'GET',
    auth: {
      username: visma.username,
      password: visma.password
    }
  }

  try {
    const { data } = await axios(options)
    return await repackVisma(data)
  } catch (err) {
    logger('error', ['tasks', 'get-visma-tasks', 'err', err])
    throw err
  }
}
