import{parentPort}from'worker_threads'


//For the first time-it's KLYNTAR only feature
let mod=await import(`@klyntar/valardohaeris/klyntar/vd.js`).then(m=>m.default).catch(e=>false), WORKER_ID, notFound=true,attempts=0


parentPort.once('message',async data=>{

    WORKER_ID=data.id

    while(notFound){

        await mod.generate().then(pair=>{

            attempts++

            if(pair.publicKey.startsWith(data.prefix)){

                notFound=false

                parentPort.postMessage({WORKER_ID,pair,attempts,v:true})

            }else data.v&&parentPort.postMessage({WORKER_ID,attempts,pair})

        })

    }

})