import { kafka } from './client.js'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init() {
    const producer = kafka.producer()
    
    console.log('Producer connecting...')
    await producer.connect()
    console.log('Producer connected')

    
    rl.setPrompt('Enter value: ')
    rl.prompt()

    rl.on('line', async (input) => {
        input = parseInt(input)
        console.log('Sending message')
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    key: 'location-update',
                    partition: input % 2 ? 0 : 1,
                    value: JSON.stringify({ name: "Akshit Trikha", data: input })
                }
            ]
        })
    }).on('close', async () => {
        console.log('Disconnecting producer...')
        await producer.disconnect()
    })
}

init()