let snoowrap = require('snoowrap');
let key = require('./redditkey');
let bot = require('./bot');

let r = new snoowrap(key.RedditAPIKey);
let redditBot = new bot.RedditBot(r);
redditBot.run();

redditBot.on('data',(data) => {
    let date = new Date();
    console.log("Data Update -> " + date.toString())
    for(let sub of data) {
        console.log(sub.title);
    }
});

