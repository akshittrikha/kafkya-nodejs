import { Kafka } from 'kafkajs'

console.log('Initializing Kafka Client')

export const kafka = new Kafka({
    clientId: 'kafkya-app',
    brokers: ['localhost:9092'],
})