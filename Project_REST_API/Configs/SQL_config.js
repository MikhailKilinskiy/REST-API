var mssql = require('mssql')

var config = {
  user: '******',
  password: '******',
  server: '******.local',
  database: 'OOS_DWH',
  // port: '',
  options: {
    encrypt: true
  },
  pool: {
    max: 10,  // Максимальное количество соединений
    min: 0,
    idleTimeoutMillis: 30000 // Время ожидания
  }
}



module.exports = config
