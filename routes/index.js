var express = require('express');
var router = express.Router();
var rp = require("request-promise");
var axios = require("axios");
var cheerio = require("cheerio");
const controller = require('../controller/index');


/* GET home page. */

router.route('/someWhere')
.get(controller.someWhere.get);

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/index', function(req, res, next){
  rp(`https://www.reddit.com/`)
  .then((data) => {
    const $ = cheerio.load(data);

    // Categories
    const categories = [];
    $('.tabmenu').children().each(function(i, elem){
      let topic = $(this).text();
      categories[i] = topic;
    })

    // Setting the current category
    let currentCategory = $('li.selected').last().text();

    const allPosts = [];

    // Looping through each div of the post, returning an array of objects
    $('div.top-matter').each(function(i, elem){
      let obj = {};

      //Setting the title
      let title = $(this).children('.title').children('.may-blank').text();
      obj['title'] = title;

      //Setting the URL
      let url = $(this).children('.flat-list').children('.first').children('.comments').attr('href');
      obj['url'] = url;

      // Image Boolean
      let img = $(this).parent('.entry').prev('.invisible-when-pinned').children().attr('src');
      let imgTest = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(img);

      // Video Boolean
      let vid = $(this).parent('.entry').prev('.invisible-when-pinned').children().hasClass('duration-overlay');

      // Link Boolean
      let link = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('default');

      // Text Boolean
      let text = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('self');

      // Setting the TYPE
      if (imgTest === true) {
        obj['type'] = 'image';
      }

      if (vid === true) {
        obj['type'] = 'video'
      }

      if (link === true) {
        obj['type'] = 'link';
      }

      if (text === true) {
        obj['type'] = 'text';
      }

      // Placing the new object
      allPosts[i] = obj;
    });

    // Reducing data to relevent numbers
    const currentPosts = allPosts.reduce(function(acc, currentValue, currentIndex){
      if (currentIndex >= 5 && currentIndex <= 9) {
        acc.push(currentValue);
      }
      return acc
    }, [])

    // Returning Data
    return res.json({
      "category": categories,
      "startIndex": 0,
      "endIndex": 4,
      "currentCategory": currentCategory,
      "posts": currentPosts
    });
  })

  .catch((err) => {
    console.log(err);
    res.json({
      message: err
    })
  });
})

router.get("/index/:category", function(req, res, next){

  rp(`https://www.reddit.com/${req.params.category}`)
  .then((data) => {
    const $ = cheerio.load(data);

    // Categories
    const categories = [];
    $('.tabmenu').children().each(function(i, elem){
      let topic = $(this).text();
      categories[i] = topic;
    })

    // currentCategory
    let currentCategory = $('li.selected').last().text();
    // console.log(currentCategory);

    // posts
    const allPosts = [];

    $('div.top-matter').each(function(i, elem){
      let obj = {};

      let title = $(this).children('.title').children('.may-blank').text();
      obj['title'] = title;

      let url = $(this).children('.flat-list').children('.first').children('.comments').attr('href');
      obj['url'] = url;

      // Image Boolean
      let img = $(this).parent('.entry').prev('.invisible-when-pinned').children().attr('src');
      let imgTest = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(img);

      // Video Boolean
      let vid = $(this).parent('.entry').prev('.invisible-when-pinned').children().hasClass('duration-overlay');

      // Link Boolean
      let link = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('default');

      // Text Boolean
      let text = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('self');
      console.log(text);

      if (imgTest === true) {
        obj['type'] = 'image';
      }

      if (vid === true) {
        obj['type'] = 'video'
      }

      if (link === true) {
        obj['type'] = 'link';
      }

      if (text === true) {
        obj['type'] = 'text';
      }

      // console.log(obj);

      allPosts[i] = obj;

    });

    const currentPosts = allPosts.reduce(function(acc, currentValue, currentIndex){
      if (currentIndex >= 0 && currentIndex <= 4) {
        acc.push(currentValue);
      }
      return acc
    }, [])

    return res.json({
      "category": categories,
      "startIndex": 5,
      "endIndex": 9,
      "currentCategory": req.params.category,
      "posts": currentPosts
    });

  })
  .catch((err) => {
    console.log(err);
    res.json({
      message: err
    })
  });
});


router.get("/index/:category/:startIndex", function(req, res, next){

  rp(`https://www.reddit.com/${req.params.category}`)
  .then((data) => {
    const $ = cheerio.load(data);
    const endIndex = Number(req.params.startIndex) + 4;

    // Categories
    const categories = [];
    $('.tabmenu').children().each(function(i, elem){
      let topic = $(this).text();
      categories[i] = topic;
    })

    // currentCategory
    let currentCategory = $('li.selected').last().text();
    // console.log(currentCategory);

    // posts
    const allPosts = [];

    $('div.top-matter').each(function(i, elem){
      let obj = {};

      let title = $(this).children('.title').children('.may-blank').text();
      obj['title'] = title;

      let url = $(this).children('.flat-list').children('.first').children('.comments').attr('href');
      obj['url'] = url;

      // Image Boolean
      let img = $(this).parent('.entry').prev('.invisible-when-pinned').children().attr('src');
      let imgTest = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(img);

      // Video Boolean
      let vid = $(this).parent('.entry').prev('.invisible-when-pinned').children().hasClass('duration-overlay');

      // Link Boolean
      let link = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('default');

      // Text Boolean
      let text = $(this).parent('.entry').prev('.invisible-when-pinned').hasClass('self');
      console.log(text);

      if (imgTest === true) {
        obj['type'] = 'image';
      }

      if (vid === true) {
        obj['type'] = 'video'
      }

      if (link === true) {
        obj['type'] = 'link';
      }

      if (text === true) {
        obj['type'] = 'text';
      }

      // console.log(obj);

      allPosts[i] = obj;

    });

    const currentPosts = allPosts.reduce(function(acc, currentValue, currentIndex){
      if (currentIndex >= req.params.startIndex && currentIndex <= endIndex) {
        acc.push(currentValue);
      }
      return acc
    }, [])

    return res.json({
      "category": categories,
      "startIndex": Number(req.params.startIndex),
      "endIndex": endIndex,
      "currentCategory": req.params.category,
      "posts": currentPosts
    });

  })
  .catch((err) => {
    console.log(err);
    res.json({
      message: err
    })
  });
});

module.exports = router;
