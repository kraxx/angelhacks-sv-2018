'use strict';
const Alexa = require('alexa-sdk');

var http = require('http');

// var parsedJSON = require('./sample.json');
var parsedObject =
{
    "index" : {
        "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
        "startIndex": 0,
        "endIndex": 4,
        "currentCategory": "hot",
        "posts": [{
        "title": "Never go full retard",
        "type": "image",
        "url": ""
        }, {
        "title": "Authentic Signature",
        "type": "text",
        "url": ""
        }, {
        "title": "The dogs are hunting",
        "type": "video",
        "url": ""
        }, {
        "title": "Goodboy making the newborn baby stop crying",
        "type": "image",
        "url": ""
        }, {
        "title": "Mexican Government Protects Peyote for Native Rituals",
        "type": "link",
        "url": ""
        }]
    },
    "getMorePost": {
        "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
        "startIndex": 5,
        "endIndex": 9,
        "currentCategory": "hot",
        "posts": [{
          "title": "Never go full retard",
          "type": "image",
          "url": ""
        }, {
          "title": "Authentic Signature",
          "type": "text",
          "url": ""
        }, {
          "title": "The dogs are hunting",
          "type": "video",
          "url": ""
        }, {
          "title": "Goodboy making the newborn baby stop crying",
          "type": "image",
          "url": ""
        }, {
          "title": "Mexican Government Protects Peyote for Native Rituals",
          "type": "link",
          "url": ""
        }]
    },
    "postDetail": {
        "title": "",
        "type": "image",
        "contents": "",
        "createdBy": "",
        "comments": [
          {
            "contents": "Hello!",
            "createdBy": "rockethyun",
            "points": 421,
            "childComments": [
              {
                "contents": "Hello!",
                "createdBy": "rockethyun",
                "points": 421,
                "childComments": [
                ]
              }
            ]
          },
          {
            "contents": "Hello!",
            "createdBy": "rockethyun",
            "points": 421,
            "childComments": [
              {
                "contents": "Hello!",
                "createdBy": "rockethyun",
                "points": 421,
                "childComments": [
                ]
              }
            ]
          }
        ]
    }
}


const API_URL = "";

const handlers = {
    "LaunchRequest": function () {
      var alexa = this;
      alexa.response.speak("Hello. Which website do you want to browse?").listen();
      alexa.emit(':responseReady');
    },
    "ShowingWebsiteIntent": function() {
        var alexa = this;
        var siteName = alexa.event.request.intent.slots.site.value;

        alexa.attributes.lastState = {
            level: 1,
            siteName: siteName
        };

        alexa.response.speak(`
                                You are currently on ${siteName}.com. There are 7 menus - hot, new, rising, controversial, top, gilded, wiki.
                                What do you want to do? Say, 'Show new menu.' or, 'Browse other site.'"
                             `).listen();
        alexa.emit(':responseReady');

    },
    "SelectingCategoryIntent": function() {
        var alexa = this;
        var category = alexa.event.request.intent.slots.category.value;
        // console.log(category);
        // http.get(API_URL, function(res){


            // res = res.setEncoding('utf8');
            // var body = '';
            // res.on('data', function(chunk) {
            //     body += chunk;
            // });
            // res.on('end', function() {
                // var posts = JSON.parse(body.posts);
                var posts = parsedObject.index.posts;
                // console.log(parsedJSON);

                alexa.attributes.lastState = {
                    level: 2,
                    category: category,
                    startIndex: 0
                }
                alexa.response.speak(`
                                        You've chosen ${category} category. Here's first three posts.
                                        1. ${posts[0].title}. It's a ${posts[0].type} post.
                                        2. ${posts[1].title}. It's a ${posts[1].type} post.
                                        3. ${posts[2].title}. It's a ${posts[2].type} post.
                                        What do you want to do? Say 'Read one' or 'More posts.'
                                    `).listen();
                alexa.emit(':responseReady');
            // });

        // })
        // .on('error', function(e) {
        //     console.log("Got error: " + e.message);
        //     alexa.response.speak(`Sorry select your category again by saying 'Show top menu.'`);
        // });

    },
    "ShowingMoreIntent": function() {
        var alexa = this;
        var contentType = alexa.event.request.intent.slots.contentType.value;
        var category = alexa.attributes.lastState.category;
        var startIndex = alexa.attributes.lastState.startIndex + 3;

        if (contentType === "posts") {

            var posts = parsedObject.getMorePost.posts;

            alexa.attributes.lastState = {
                level: 2,
                category: category,
                startIndex: startIndex
            };

            alexa.response.speak(`
                                    Here's next three posts.
                                    1. ${posts[0].title}. It's a ${posts[0].type} post.
                                    2. ${posts[1].title}. It's a ${posts[1].type} post.
                                    3. ${posts[2].title}. It's a ${posts[2].type} post.
                                    What do you want to do? Say 'Read one' or 'More posts.'
                                `).listen();
            alexa.emit(':responseReady');




            // http.get(API_URL, function(res){


            // })
            // .on('error', function(e){
            //     console.log("Got error: " + e.message);
            //     alexa.response.speak(`Sorry select your category again by saying 'Show top menu.'`);
            // });

        } else {
            alexa.response.speak(`Not Yet!`);
            alexa.emit(':responseReady');

        }
    },
    // "ReadingPostIntent": function() {
    //     var alexa = this;
    //     // var category = alexa.event.request.intent.slots.direction.value;
    //     http.get(API_URL, function(res){

    //         res = res.setEncoding('utf8');
    //         var body = '';
    //         res.on('data', function(chunk) {
    //             body += chunk;
    //         });
    //         res.on('end', function() {
    //             var post = JSON.parse(body);
    //             alexa.response.speak(`
    //                                     Reading the post.
    //                                     ${post.title} by ${post.createdBy}.
    //                                     Contents: ${hasImage() ? ' there is an image' : ''}. ${post.contents}
    //                                     What do you want to do? Say 'Read comments.' or 'Go Back.'
    //                                 `).listen();
    //             alexa.emit(':responseReady');
    //         });
    //     })
    //     .on('error', function(e) {
    //         console.log("Got error: " + e.message);
    //         alexa.response.speak(`Sorry select your post again by saying 'Say 'Read one'`);
    //             alexa.emit(':responseReady');
    //     });
    // },
    // "OtherPostIntent": function() {
    //     var alexa = this;
    //     http.get(API_URL, function(res){

    //     });
    // },
    "AMAZON.CancelIntent": function() {
        this.response.speak(`Exiting. Good Bye.`);
        this.emit(':responseReady');

    },
    "AMAZON.StopIntent": function() {
        this.response.speak(`Exiting. Good Bye.`);
        this.emit(':responseReady');

    },
    'Unhandled': function () {
        this.emit(':ask', 'Insert your own error message here');
    }
};

var hasImage = function(type) {
    if(type === "image") {
        return true;
    } else {
        return false;
    }
}

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);

    alexa.execute();
};
