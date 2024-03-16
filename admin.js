const kafka = require('./client');


async function init() {
    const admin = kafka.admin();
    console.log("admin connecting");
    await admin.connect();
    console.log("admin connection success");

    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,

        }]
    })
    console.log("done");
    await admin.disconnect();
}

init();