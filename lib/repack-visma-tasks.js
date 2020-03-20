const Parser = require('xml2js-parser')
const parser = new Parser({ trim: true })

module.exports = async data => {
  const parsed = await parser.parseString(data)
  const tasks = (parsed.tasks.length < 1 || typeof parsed.tasks.task === 'undefined') ? [] : parsed.tasks.task

  return tasks.map(task => {
    return {
      systemid: 'visma',
      title: task.$.text || '',
      url: task.$.link || '',
      number: task.$.number || '',
      timestamp: new Date().getTime()
    }
  })
}
