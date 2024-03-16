const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "Kafka POC",
    brokers: ["192.168.29.124:9092"],
})

module.exports = kafka;