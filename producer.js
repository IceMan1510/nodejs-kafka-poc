const kafka = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafka.producer();

    await producer.connect();
    console.log("producer connected");

    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', async function (line) {
        console.log(line);
        const [riderName, location] = line.split(' ');
        console.log(riderName);
        console.log(location);
        await producer.send({
            topic: 'rider-updates',
            messages: [{
                partition: location.toLowerCase() === 'north' ? 0 : 1,
                key: 'location-update',
                value: JSON.stringify({ name: riderName, loc: location })
            }]
        })

    }).on('close', async () => {
        console.log("Values produced");
        producer.disconnect();
        console.log('prod done');
    })
}

init();