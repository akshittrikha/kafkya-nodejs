import { kafka } from "./client.js";

async function init() {
    const admin = kafka.admin()
    
    console.log('Admin connecting...')
    await admin.connect()
    console.log('Admin connected.')
    
    console.log('Creating topic: [rider-updates]')
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
            }
        ]
    })
    console.log('Created topic: [rider-updates]')
    
    let topicList = await admin.listTopics()
    console.log('Topics: ', topicList)
    
    // console.log('Deleting topics')
    // await admin.deleteTopics({
    //     topics: ['rider-updates'],
    // })
    
    // topicList = await admin.listTopics()
    // console.log('Topics: ', topicList)
    
    console.log('Admin disconnecting...')
    await admin.disconnect()
    
    console.log('Admin disconnected')
}

init()