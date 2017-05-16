var snoowrap = require('snoowrap');
var EventEmitter = require('events');
var key = require('./redditkey');
var bot = require('./redditbot.js');

var r = new snoowrap(key.RedditAPIKey);

var redditBot = new bot.RedditBot(r);

redditBot.addUser("boogermanus");
redditBot.run();

