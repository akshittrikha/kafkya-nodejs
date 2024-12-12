import { kafka } from './client.js'

async function init() {
    const producer = kafka.producer()
    
    console.log('Producer connecting...')
    await producer.connect()
    
    console.log('Sending message')
    await producer.send({
        topic: 'rider-updates-2',
        messages: [
            {
                key: 'location-update',
                partition: 0,
                value: JSON.stringify({ name: "Akshit Trikha", data: process.argv[2] })
            }
        ]
    })

    console.log('Disconnecting producer...')
    await producer.disconnect()
}

init()