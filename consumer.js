import { kafka } from './client.js'
const group = process.argv[2]

async function init() {
    const consumer = kafka.consumer({ groupId: group })
    await consumer.connect()

    console.log('Subscribing to the topic')
    await consumer.subscribe({ topics: ['rider-updates'], fromBeginning: true })
    console.log('Topic subscribed')

    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
            console.log('*** Processing... ***')
            console.log({
                topic,
                partition,
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
        },
    })

    //! disconnecting the consumer does not allow to consume any messages
    // console.log('Disconnecting consumer...')
    // await consumer.disconnect()
}

init()