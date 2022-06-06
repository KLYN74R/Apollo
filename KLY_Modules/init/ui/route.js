export default (fastify, options, next) => {

    fastify.get('/', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/init.ejs',{text:'hello,this is the entry point'})
    
    })
    
    fastify.get('/index', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/index.ejs',{text:'Another entry point'})
    
    })

    fastify.get('/style', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/style.css')
    
    })
    

   
    next()

}