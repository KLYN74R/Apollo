export default (fastify, options, next) => {

    // Declare a route
    fastify.get('/', async (request, reply) => {
        
        return { plugin: 'test' }
    
    })

    fastify.get("/hello", (req, reply) => {
        
        reply.view('MyProjects/Klyntar/Apollo/KLY_ServicesAPI/some_service/ui/templates/index.ejs', { text: "HELLO KLYNTAR" });
    
    });
    
    next()

}
