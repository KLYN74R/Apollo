export default (fastify, options, next) => {

    fastify.get('/', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/index.ejs')
    
    })
    
    fastify.get('/style', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/style.css')
    
    })
    

   
    next()

}