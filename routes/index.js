var express = require('express');
var router = express.Router();
var fsPromises = require('fs').promises;

/* GET home page. */
router.get('/', function(req, res, next) {
  // fs.readdir(__dirname + '/../public/images/linkovi/', (err, files) => {
  // if (err) res.send(`<h2>${err}<h2>`);
  // else {
  //   console.log('TCL: files', files);
  //   res.render('index', { files: files });
  // }
  // });

  fsPromises
    .readdir(__dirname + '/../public/images/linkovi')
    .then(files => {
      console.log('TCL: files', files);
      res.render('index', { files: files });
    })
    .catch(err => res.send(`<h2>${err}<h2>`));
});

module.exports = router;
