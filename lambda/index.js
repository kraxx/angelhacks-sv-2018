'use strict';
const Alexa = require('alexa-sdk');

var http = require('http');

const API_URL = "";

const handlers = {
    "LaunchRequest": function () {
      var alexa = this;
      alexa.response.speak("Hello. Which website do you want to browse?").listen();
      alexa.emit(':responseReady');
    },
    "ShowingWebsiteIntent": function() {
        var alexa = this;

        alexa.response.speak(`
                                You are currently on Reddit.com. There are 7 menus - hot, new, rising, controversial, top, gilded and wiki.
                                What do you want to do? Say 'Show new menu.' or 'Browse other site.'"
                             `);
        alexa.emit(':responseReady');

    },
    "SelectingCategoryIntent": function() {
        var alexa = this;

        // TODO direction change
        var category = alexa.event.request.intent.slots.direction.value;
        http.get(API_URL, function(res){

            res = res.setEncoding('utf8');
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var posts = JSON.parse(body.posts);
                alexa.response.speak(`
                                        You've chosen ${category} category. Here's first five posts.
                                        1. ${posts[0].title}. It's a ${posts[0].type} post.
                                        2. ${posts[1].title}. It's a ${posts[1].type} post.
                                        3. ${posts[2].title}. It's a ${posts[2].type} post.
                                        What do you want to do? Say 'Read one' or 'Other posts.'
                                    `);
                alexa.emit(':responseReady');
            });

        })
        .on('error', function(e) {
            console.log("Got error: " + e.message);
            alexa.response.speak(`Sorry select your category again by saying 'Show top menu.'`);
        });

    },
    "ReadingPostIntent": function() {
        var alexa = this;
        // var category = alexa.event.request.intent.slots.direction.value;
        http.get(API_URL, function(res){

            res = res.setEncoding('utf8');
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var post = JSON.parse(body);
                alexa.response.speak(`
                                        Reading the post.
                                        ${post.title} by ${post.createdBy}.
                                        Contents: ${hasImage() ? ' there is an image' : ''}. ${post.contents}
                                        What do you want to do? Say 'Read comments.' or 'Go Back.'
                                    `).listen();
                alexa.emit(':responseReady');
            });
        })
        .on('error', function(e) {
            console.log("Got error: " + e.message);
            alexa.response.speak(`Sorry select your post again by saying 'Say 'Read one'`);
        });
    },
    "OtherPostIntent": function() {
        var alexa = this;
        http.get(API_URL, function(res){

        });
    },
    "RocketBusIntent": function () {

        http.get(API_URL, function(res) {
            res = res.setEncoding('utf8');
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                // console.log(body);
                var hurry = false;
                if(Number(JSON.parse(body).exps1[0]) < 60){
                  hurry = true;
                }
                var firstBusTime = secondsToString(JSON.parse(body).exps1[0]);
                var secondBusTime = secondsToString(JSON.parse(body).exps2[0]);

                if(hurry) {
                  alexa.response.speak(`Hello Rocket,
                                        Your first bus comes in ${firstBusTime}.
                                        You'd better hurry.
                                        And second bus comes in ${secondBusTime}.
                                        `);
                } else {
                  alexa.response.speak(`Hello Rocket,
                                        Your first bus comes in ${firstBusTime}.
                                        And second bus comes in ${secondBusTime}.
                                        `);
                }
                alexa.emit(':responseReady');
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            // context.done(null, 'FAILURE');
        });

    this.response.speak("Hello, Junghyun");
    this.emit(':responseReady');
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
