var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BG44');
var Schema = mongoose.Schema;

var aucShema = new Schema({
    NotificationId: Number,
    PurchaseNumber: String,
    DocPublishDate: Date,
    PurchaseObjectInfo: String,
    PlacingWayCode: String,
    ETPCode: String,
    MaxPriceSum: Number
},
{ collection : 'auc_test' })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connection established')
});

var Notification = mongoose.model('Notification', aucShema)

module.exports = {
  // Загрузка всех элементов
  loadAll: function(req, res) {
    Notification.find({}, function(err, auctions){
      if (err) throw err;
    // console.log(auctions);
    console.log('GET ', req.url)
    // console.log(req.params)
    var auc_json = res.json(auctions)
    // console.log(auc_json)

    })
  },

  // Загрузка одного элемента по id
  getById: function(req, res){
    console.log(req.params)
    var id = parseInt(req.params.NotificationId)
    Notification.findOne({NotificationId: id}, function(err, auctions){
      if (err) throw err
    console.log('GET ', req.url)
    var aucId_json = res.json(auctions)
    console.log(aucId_json)

  })
},

  // Создание элемента
  createElement: function(req, res){
    console.log(req)
    var data = req.params
    console.log(data)
    var auction = new Notification({
      NotificationId: data.NotificationId,
      PurchaseNumber: data.PurchaseNumber,
      DocPublishDate: data.DocPublishDate,
      PurchaseObjectInfo: data.PurchaseObjectInfo,
      PlacingWayCode: data.PlacingWayCode,
      ETPCode: data.ETPCode,
      MaxPriceSum: data.MaxPriceSum
    })

    auction.save(function(err){
      if(err) res.json({"Error": err})
      return
      })

      res.send(data)
      console.log('Сохранен объект')
  },

  // Обновление элемента
  updateElement: function(req, res){
    var id = parseInt(req.params.NotificationId)
    var data = req.params
    var auction = {
      NotificationId: data.NotificationId,
      PurchaseNumber: data.PurchaseNumber,
      DocPublishDate: data.DocPublishDate,
      PurchaseObjectInfo: data.PurchaseObjectInfo,
      PlacingWayCode: data.PlacingWayCode,
      ETPCode: data.ETPCode,
      MaxPriceSum: data.MaxPriceSum
    }
    Notification.findOneAndUpdate({NotificationId: id}, auction, function(err, doc){
      if(err) res.json({"Error": err})
      res.send(doc)
    })
  },

  // Удаление элемента
  deleteElement: function(req, res){
    var id = parseInt(req.params.NotificationId)
    Notification.findOneAndRemove({NotificationId: id}, function (err,offer){
        if(err) { throw err; }
        console.log(offer)
    })

    console.log('DELETE ' + req.url);
    res.json({"Sucess": "ItemDeleted"});
  }


}
