const axios = require('axios')
const logger = require('./logger')
const { graph } = require('../config')

module.exports = async token => {
  const options = {
    url: graph.me.url,
    method: 'GET',
    headers: {
      Authorization: token
    },
    params: {
      $select: graph.me.properties
    }
  }

  try {
    const { data } = await axios(options)
    return data
  } catch (err) {
    logger('error', ['tasks', 'get-graph-user', 'err', err])
    throw err
  }
}
