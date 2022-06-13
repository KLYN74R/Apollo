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

let {hash}=await import('blake3-wasm'),

    BLAKE3=v=>hash(v).toString('hex')


const PATH_RESOLVE=path=>__dirname+'/'+path







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

        import(`@klyntar/valardohaeris/${request.params.format}/vd.js`).then(async m=>{

            let keypair=await m.default.generate()

            if(keypair&&request.params.checked==='true'){

                let kp=JSON.stringify(keypair)


                !fs.existsSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}`)) && fs.mkdirSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}`))

                fs.writeFileSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}/${BLAKE3(kp)}.json`),kp)

            }

            reply.send(keypair)

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

    
    fastify.get('/cryptoland/:scope/:operation/:params', async(request, reply) => {
   
        if(request.params.scope==='multisig'){

            if(request.params.operation==='generate'){
 
                let MOD = (await import('../../../signatures/multisig/bls.js')).default,

                    privateKey = await MOD.generatePrivateKey(),

                    pubKey=MOD.derivePubKey(privateKey)
                
                reply.send({privateKey,pubKey})

            }

        }else if(request.params.scope==='ringsig'){

            if(request.params.operation==='generate'){
                console.log('Here')

                let wallet=await import('module').then(
                
                    mod => mod.createRequire(import.meta.url)
                
                ).then(require=>
               
                    require('../../../signatures/ringsig/lrs-ecdsa/export.js').Wallet.createRandom()

                )

                reply.send({
                    privateKey: wallet.privateKey,
                    publicKey: wallet.signingKey.publicKey,
                    address:wallet.address
                })

            }

        }else if(request.params.scope==='tsig'){

            if(request.params.operation==='generate'){
 
                import('./signatures/threshold/tbls.js').then(

                    bundle => fs.writeFileSync(opts.path,bundle.default.generateTBLS(+opts.threshold,opts.id,opts.signers.split(',')))

                )

            }

        }else if(request.params.scope==='pqc'){

            if(request.params.operation==='generate'){
 
                let index=(await import('../../../KLY_Addons/index.js')).default
    
                opts.list?index.list():index.action(opts.function,opts.parameters)//call function and pass params if function need it

            }

        }

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

    fastify.get('/symbiotes', (request, reply) => {
    
        reply.view('KLY_Modules/init/ui/templates/symbiotes.ejs')
        
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
    
        reply.view('KLY_Modules/init/ui/templates/misc.ejs')
    
    })


    fastify.get('/misc/checkrepo', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/configs', (request, reply) => {
    
        reply.send(JSON.stringify(CONFIGURATION,null,3))
    
    })

    fastify.get('/misc/update_symbiotes', (request, reply) => {
    
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

    fastify.get('/scripts/:script', (request, reply) => {
    
        reply.view(`KLY_Modules/init/ui/scripts/${request.params.script}`)
    
    })

   
    next()

}