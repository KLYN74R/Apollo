import fs from 'fs'

export default (fastify, options, next) => {

    fastify.get('/', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/index.ejs',{text:'Hello,this is the entry point to control Klyntar'})
    
    })

    fastify.get('/style/:style', (request, reply) => {
    
        reply.view(`KLY_Modules/init/ui/styles/${request.params.style}`)
    
    })

    fastify.get('/images/:image', (request, reply) => {

        console.log(`KLY_Modules/init/ui/images/${request.params.image}`)

        const buffer = fs.readFileSync(`KLY_Modules/init/ui/images/${request.params.image}`)
        
        console.log('Buffer is ',buffer)

        reply.type('image/png') // if you don't set the content, the image would be downloaded by browser instead of viewed
        
        reply.send(buffer)

    })

   
    next()

}