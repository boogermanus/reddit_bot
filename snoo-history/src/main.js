const snoowrap = require('snoowrap');
const fs = require('fs');
const snooze = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const snooConf = {
        userAgent: 'snoo history view',
        clientId: 'Zw-2dqyeVwabwg',
        clientSecret: '8SPB0S72QdlEudElp-yzgFSiKIs',
        username: 'boogermanus',
        password: 'Shiz37une'
}

async function main() {
    let api = new snoowrap(snooConf);
    let user = api.getUser("boogermanus");
    let saved = await user.getSavedContent();

    console.log('Building Data');
    for(let i=0; i<8;i++)
    {
        // console.log(saved.toJSON());
        await snooze(2000);
        saved = await saved.fetchMore({amount: 100});
        console.log(`Loaded ${saved.length} records`)
    }

    let stream = fs.createWriteStream("out.json", {
        encoding: "UTF8"
    });

    console.log("Writing data");
    stream.write(JSON.stringify(saved, null, 2));
    stream.close();

    console.log("Complete");
}

main();