/*

██╗███╗   ██╗██╗████████╗    ██████╗  ██████╗ ██╗   ██╗████████╗███████╗██████╗ ███████╗
██║████╗  ██║██║╚══██╔══╝    ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝
██║██╔██╗ ██║██║   ██║       ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ██████╔╝███████╗
██║██║╚██╗██║██║   ██║       ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ██╔══██╗╚════██║
██║██║ ╚████║██║   ██║       ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗██║  ██║███████║
╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝



Hello,it's Vlad :)

This it the initial,the most default version of UI interface of Apollo to control KLYNTAR infrastructure and operate your coins,tokens,services data,provide information to you about symbiotes,services and so on
In future it will be more advanced app to give your more abilities

Hope,you'll like it 😀


*/


import fs from 'fs'



export default (fastify, options, next) => {

    //_______________________________________ DEFAULT ROUTES ________________________________________



    //Start page
    fastify.get('/', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/index.ejs',{text:'Hello,this is the entry point to control Klyntar'})

        
    })

    fastify.get('/start', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/start.ejs',{text:'This is what you can do'})

        
    })

    fastify.get('/keygen', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/keygen.ejs')

        
    })

    fastify.get('/key_generate/:format', (request, reply)=>{

        import(`@klyntar/valardohaeris/${request.params.format}/vd.js`).then(async m=>{

            reply.send(await m.default.generate())

        }).catch(e=>reply.send(`Oops,some error has been occured ${e}`))

    })
    
    

    //Need for tests
    fastify.get('/old', (request, reply) => {
    
        reply.view('./test.ejs',{text:'Hello,this is the entry point to control Klyntar'})
    
    })


    fastify.get('/configs', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIG,null,3))
    
    })




    //__________________________________ STYLES, IMAGES AND SO ON __________________________________


    fastify.get('/style/:style', (request, reply) => {
    
        reply.view(`KLY_Modules/init/ui/styles/${request.params.style}`)
    
    })

   
    next()

}