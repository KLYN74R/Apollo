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


    // ██╗  ██╗███████╗██╗   ██╗ ██████╗ ███████╗███╗   ██╗
    // ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝ ██╔════╝████╗  ██║
    // █████╔╝ █████╗   ╚████╔╝ ██║  ███╗█████╗  ██╔██╗ ██║
    // ██╔═██╗ ██╔══╝    ╚██╔╝  ██║   ██║██╔══╝  ██║╚██╗██║
    // ██║  ██╗███████╗   ██║   ╚██████╔╝███████╗██║ ╚████║
    // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═══╝
    
    

    fastify.get('/keygen', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/keygen.ejs')
        
    })

    fastify.get('/key_generate/:format/:checked', (request, reply)=>{

        console.log(request.params.checked)

        import(`@klyntar/valardohaeris/${request.params.format}/vd.js`).then(async m=>{

            reply.send(await m.default.generate())

        }).catch(e=>reply.send(`Oops,some error has been occured ${e}`))

    })
    

    //  ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗ ██╗      █████╗ ███╗   ██╗██████╗ 
    // ██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗██║     ██╔══██╗████╗  ██║██╔══██╗
    // ██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║██║     ███████║██╔██╗ ██║██║  ██║
    // ██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║██║     ██╔══██║██║╚██╗██║██║  ██║
    // ╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝███████╗██║  ██║██║ ╚████║██████╔╝
    //  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 

    fastify.get('/cryptoland', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/cryptoland.ejs')

    })

    // ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗███████╗
    // ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔════╝
    // ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ███████╗
    // ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ╚════██║
    // ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗███████║
    // ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝╚══════╝
    
    fastify.get('/services', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/services.ejs')
        
    })


    fastify.get('/services/build', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/services.ejs')
        
    })

    fastify.get('/services/interact', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/services.ejs')
        
    })

    // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
    // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
    // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    fastify.get('/events', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/events.ejs')
        
    })


    // ███╗   ███╗██╗   ██╗    ███████╗███╗   ███╗██████╗ ██╗██████╗ ███████╗
    // ████╗ ████║╚██╗ ██╔╝    ██╔════╝████╗ ████║██╔══██╗██║██╔══██╗██╔════╝
    // ██╔████╔██║ ╚████╔╝     █████╗  ██╔████╔██║██████╔╝██║██████╔╝█████╗  
    // ██║╚██╔╝██║  ╚██╔╝      ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║██╔══██╗██╔══╝  
    // ██║ ╚═╝ ██║   ██║       ███████╗██║ ╚═╝ ██║██║     ██║██║  ██║███████╗
    // ╚═╝     ╚═╝   ╚═╝       ╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝

    fastify.get('/empire', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })


    // ███╗   ███╗██╗███████╗ ██████╗
    // ████╗ ████║██║██╔════╝██╔════╝
    // ██╔████╔██║██║███████╗██║        
    // ██║╚██╔╝██║██║╚════██║██║     
    // ██║ ╚═╝ ██║██║███████║╚██████╗
    // ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝
                                                                      

    fastify.get('/misc', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })


    fastify.get('/misc/checkrepo', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/configs', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/update_aliases', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/unobtanium', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/whatsnew', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    //_________________________ UPDATE ALIASES _____________________





    //Need for tests
    fastify.get('/old', (request, reply) => {
    
        reply.view('./test.ejs',{text:'Hello,this is the entry point to control Klyntar'})
        
    })
    



    //__________________________________ STYLES, IMAGES AND SO ON __________________________________


    fastify.get('/style/:style', (request, reply) => {
    
        reply.view(`KLY_Modules/init/ui/styles/${request.params.style}`)
    
    })

   
    next()

}