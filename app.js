let snoowrap = require('snoowrap');
let key = require('./redditkey');
let bot = require('./bot');

let r = new snoowrap(key.RedditAPIKey);
let redditBot = new bot.RedditBot(r);
redditBot.run();

redditBot.on('data',(json) => {
    console.log('Event Count: ' + json.count);
});

