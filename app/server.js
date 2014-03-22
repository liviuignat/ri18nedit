var express = require('express');
var app = express();

app.configure(function(){
	app.set('views', __dirname);
	app.engine('html', require('ejs').renderFile);
  app.use(express.static(__dirname + '/sources'));
})

app.get('/', function(req, res){
  res.render('index.html');
});

app.listen(3000);