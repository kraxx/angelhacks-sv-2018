const express = require('express');
const router = express.Router();

const controller = require('../controller/index');


/* GET home page. */

router.route('/reddit')
.get(controller.reddit.get);

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
