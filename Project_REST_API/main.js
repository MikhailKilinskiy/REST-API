var restify = require('restify');
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static-restify')

const port = 8080;
// REST API
var restApi = require('./api');

// Создаем сервер
var server = restify.createServer({
  name: 'myApp'
})

server.pre(serveStatic('static'))

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  origins: ['http://localhost:8080/'],
  methods: ['GET','PUT','DELETE','POST','OPTIONS']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({ mapParams: true }))// MIDDLEWARE для обработки POST запросов

server.use(function(req, res, next){
  console.log(req.method + ' ' + req.url)
  next()
})

// Начальная страница
server.get('/', function(req, res){
  var index = path.join(__dirname, 'static/index.html')
  console.log(req.params)
  console.log(index)

  fs.readFile(index, "utf-8", function(err, file){
    if(err){
      res.writeHead(500, {"Content-Type": "text/plain"})
      res.write(err)
      res.end()
      return
    }
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(file)
    res.end()
  })
})

// Выбрать все элементы
server.get('/api', restApi.loadAll)

// Загрузка одного элемента по id
server.get('/api/:NotificationId', restApi.getById)

// Создание элемента
server.post('/api', restApi.createElement)

// Обновление элемента
server.put('/api/:NotificationId', restApi.updateElement)

// Удаление элемента
server.del('/api/:NotificationId', restApi.deleteElement)

server.listen(port, function(){
  console.log('Server running on port ', port)
})
