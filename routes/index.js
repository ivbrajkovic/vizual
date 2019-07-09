var express = require('express');
var router = express.Router();
var fsPromises = require('fs').promises;
// var fs = require('fs');

const regex = /-(.*)\./;

/* GET home page. */
router.get('/test', function(req, res, next) {
  fsPromises
    .readdir(__dirname + '/../public/images/linkovi')
    .then(files => {
      // console.log('TCL: files', files);

      let matches;
      let obj = {};
      files.forEach(file => {
        if ((matches = regex.exec(file)) !== null) {
          obj[matches[1].toUpperCase().replace(/_/g, ' ')] = file;
        }
      });

      res.render('index', { data: obj });
    })
    // .catch(err => res.send(`<h3 style="color:red;">${err}<h3>`));
    .catch(error => res.render('error', { error }));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // let setting = require.resolve('../settings.json');
  fsPromises
    .readFile('./settings.json')
    .then(data => {
      let settings = JSON.parse(data);
      res.render('index', { data: settings.kategorija });
    })
    .catch(error => res.render('error', { error }));
});

/* GET gallery page. */
router.get('/gallery/:kategorija', function(req, res, next) {
  fsPromises
    // .readdir(__dirname + '/../public/images/linkovi')
    .readdir('./public/images/' + req.params.kategorija)
    .then(files => {
      console.log('TCL: files', files);

      let obj = {};
      files.forEach(el => {
        obj[el.match(/^(.*)\./)[1]] = el;
      });
      console.log('TCL: obj', obj);

      res.render('gallery', {
        data: {
          dir: req.params.kategorija + '/',
          src: obj
        }
      });
      // res.send('OK');
    })
    .catch(error => res.render('error', { error }));
});

module.exports = router;
