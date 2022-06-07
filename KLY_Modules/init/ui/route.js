export default (fastify, options, next) => {

    fastify.get('/', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/index.ejs',{text:'Hello,this is the entry point to control Klyntar'})
    
    })

    fastify.get('/style', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/style.css')
    
    })

   
    next()

}