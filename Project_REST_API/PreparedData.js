var mssql = require('mssql')
var MongoClient = require('mongodb').MongoClient;
var config = require('./Configs/SQL_config.js')

const mongourl = "mongodb://localhost:27017";

const select = `SELECT TOP 100
	     NotificationId
      ,PurchaseNumber
      ,DocPublishDate
      ,PurchaseObjectInfo
      ,PlacingWayCode
      ,ETPCode
      ,MaxPriceSum
FROM dbo44.Notification
ORDER BY NotificationId DESC`

// Функция для вставки в монго
var MongoInsert = function(obj) {
  MongoClient.connect(mongourl, function(err, client){
    var db = client.db('BG44')

    db.collection('auc_test').insertOne(obj, function(err, result){
      if(err){
        console.log(err)
        return
      }
      console.log(result.ops) // Объект с идетификатором
      client.close
    })
  })
}

mssql.connect(config, function(err) {
  var request = new mssql.Request();
	request.stream = true; // включить режим потока данных
	request.query(select);
  // Обрабатываем построчно
  request.on('row', function(row){
    MongoInsert(row)
  })
})
