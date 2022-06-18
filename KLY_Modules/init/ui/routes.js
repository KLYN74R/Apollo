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


/*


███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗    ██████╗  ██████╗  ██████╗ ██╗     
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝    ██╔══██╗██╔═══██╗██╔═══██╗██║     
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗    ██████╔╝██║   ██║██║   ██║██║     
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║    ██╔═══╝ ██║   ██║██║   ██║██║     
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║    ██║     ╚██████╔╝╚██████╔╝███████╗
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝    ╚═╝      ╚═════╝  ╚═════╝ ╚══════╝
                                                                                                               

*/


import crypto from 'crypto'
import fs from 'fs'


let {hash}=await import('blake3-wasm'),

    BLAKE3=v=>hash(v).toString('hex'),

    PATH_RESOLVE=path=>__dirname+'/'+path,

    //We'll use 32bytes tokens
    csrfGenerator=()=>new Promise((resolve, reject)=>{

        crypto.randomBytes(32,(e,buffer)=>

            resolve(buffer.toString('hex'))

        )

    }),



    //Pool for CSRF tokens to allow you to work async even in different tabs
    tokenPool=new Set(),


    handler=(reply,path,extra)=>

        csrfGenerator().then(token=>

            reply.view(path,{token,settings:Buffer.from(JSON.stringify(CONFIGURATION.DEFAULT),'utf-8').toString('hex'),...extra})

        )








export default (fastify, options, next) => {

    //_______________________________________ DEFAULT ROUTES ________________________________________



    //Start page
    fastify.get('/',(request, reply) =>
    
        handler(reply,'KLY_Modules/init/ui/templates/index.ejs',{text:'Hello,this is the entry point to control Klyntar'})

    )

    fastify.get('/start',(request, reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/start.ejs',{text:'This is what you can do'})
        
    )


    // ██╗  ██╗███████╗██╗   ██╗ ██████╗ ███████╗███╗   ██╗
    // ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝ ██╔════╝████╗  ██║
    // █████╔╝ █████╗   ╚████╔╝ ██║  ███╗█████╗  ██╔██╗ ██║
    // ██╔═██╗ ██╔══╝    ╚██╔╝  ██║   ██║██╔══╝  ██║╚██╗██║
    // ██║  ██╗███████╗   ██║   ╚██████╔╝███████╗██║ ╚████║
    // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═══╝
    
    

    fastify.get('/keygen',(request,reply) => 

        handler(reply,'KLY_Modules/init/ui/templates/keygen.ejs')
            
    )

    fastify.get('/key_generate/:format/:checked/:alias', (request, reply)=>{

        let format=request.params.format

        if(format==='kusama' || format==='substrate format'){

            format='polkadot'

        }

        import(`@klyntar/valardohaeris/${format}/vd.js`).then(async m=>{

            let keypair=await m.default.generate()
            

            if(request.params.format==='substrate format') keypair.address=m.default.toSubstrate(keypair.publicKey)
            else if(request.params.format==='kusama') keypair.address=m.default.toKusama(keypair.publicKey)

            if(keypair&&request.params.checked==='true'){

                let kp=JSON.stringify(keypair)

                let alias = request.params.alias!=='1337' ? request.params.alias : BLAKE3(kp) // assign alias or hashed value to filename

                !fs.existsSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}`)) && fs.mkdirSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}`))

                fs.writeFileSync(PATH_RESOLVE(`KEYSTORE/${request.params.format}/${alias}.json`),kp)

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

    fastify.get('/cryptoland',(request,reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/cryptoland.ejs')

    )

    
    fastify.post('/cryptoland', async(request, reply) => {


        //Parse body
        let {scope,operation,params}=JSON.parse(request.body)
    
        if(scope==='crypt'){

            let mod=(await import('../../../common.js')).default,

                [password,privateKey]=params.split(':')

            reply.send(await mod[operation](password,privateKey))

        
        }else if(scope==='multisig'){

            let mod = (await import('../../../signatures/multisig/bls.js')).default

            if(operation==='generate'){
 
                let privateKey = await mod.generatePrivateKey(),

                    pubKey=mod.derivePubKey(privateKey)
                   
                    
                reply.send({privateKey,pubKey})

            }else if(operation==='sign'){
 
                let [msg,privateKey]=params.split(':')
                       
                reply.send(await mod.singleSig(msg,privateKey))

            }else if (operation==='verify'){

                let [msg,publicKey,signa]=params.split(':')
                       
                reply.send(await mod.singleVerify(msg,publicKey,signa))

            }else if(operation==='aggregateSignatures'){

                // Here params are array of signatures: sig1:sig2:...:sigN
                //sigX is base64 encoded,so we need to retrieve buffer form to aggregate

                reply.send(
                    
                    Buffer.from(
                        
                        mod.aggregateSignatures(params.split(':').map(
                            
                            sig => Buffer.from(sig,'base64')) //retrieve buffer from base64 encoded signature
                        
                        )
                        
                    ).toString('base64')//master signature is also base64 encoded
                    
                )

            }else if(operation==='aggregatePubKeys'){
                
                let Base58=(await import('base-58')).default

                // Here params are array of public keys: pub1:pub2:...:pubN

                reply.send(
                    
                    Base58.encode(
                        
                        mod.aggregatePublicKeys(params.split(':').map(Base58.decode))// .map because we need raw buffer(uint arrays) instead of base58 encoding
                        
                    )
                    
                )

            }


        }
        
        
        
        
        else if(scope==='ringsig'){

            let mod=await import('module').then(
                
                mod => mod.createRequire(import.meta.url)
            
            ).then(require=>
           
                require('../../../signatures/ringsig/lrs-ecdsa/export.js')

            )

            if(operation==='generate'){

                let wallet=mod.Wallet.createRandom()

                reply.send({
                    privateKey: wallet.privateKey,
                    publicKey: wallet.signingKey.publicKey,
                    address: wallet.address
                })


            }else if (operation==='sign'){
                
                let [msg,privateKey,ring]=params.split(',')
                       
                reply.send(mod.serializeRingSigtoHex(mod.sign(msg,privateKey,ring.split(':'))))

            }else if (operation==='verify'){


                let [signa,ring]=params.split(','),

                    [_,signature]=mod.deserializeRingSig(JSON.parse(Buffer.from(signa,'hex')))
    
                    
                reply.send(mod.verify(signature,ring.split(':')))

            }else if (operation==='link'){

                
                let [signa1,signa2]=params.split(':').map(hexSignature=>
                    
                    mod.deserializeRingSig(
                        
                        JSON.parse(Buffer.from(hexSignature,'hex'))
                        
                    )[1]
                    
                )
            
                reply.send(mod.link(signa1,signa2))

            }





        }else if(scope==='tsig'){


            let tblsMod=(await import('../../../signatures/threshold/tbls.js')).default

            if(operation==='generate'){
                
                //To generate t/n TBLS creds we need threshold,array of ids and your id
                //! Note: Pass array of ids as values like in CSV format e.g 1,2,3 or David,Nancy,Alex ...(and so on)
                let [threshold,myId,idsArray]=params.split(':')

                idsArray=idsArray.split(',')

                if(!idsArray.includes(myId)){

                    reply.send({error:'Your ID should be included in array of ids.Be careful'})

                }else{

                    let creds=tblsMod.generateTBLS(+threshold,myId,idsArray)

                    reply.send(creds)


                }
            
            }else if(operation==='verifyShare'){
                
                let [hexMyId,hexSomeSignerSecretKeyContribution]=params.split(':')

                reply.send(tblsMod.verifyShareTBLS(hexMyId,hexSomeSignerSecretKeyContribution,JSON.parse(request.body).vv))

                
            }else if(operation==='deriveGroupPub'){
                
                reply.send(tblsMod.deriveGroupPubTBLS(params))
            
            }else if(operation==='signaShare'){
                
                /*

                    На вход поступают данные вида

                    {
                    
                        hexMyId - id из первоначального массива signers из generateTBLS
                        sharedPayload:[
                            {
                                verificationVector://VV of signer1 - array of hex values
                                secretKeyShare://share received from signer1 - hex value
                            },
                            {
                                verificationVector://VV of signer2
                                secretKeyShare://share received from signer2
                            },
                            ...,
                            {
                                verificationVector://VV of signerN
                                secretKeyShare://share received from signerN
                            
                            }
                        ]
                    
                    }
                
                */
                let [hexMyId,message] = params.split(':'),

                    vvList=JSON.parse(request.body).vv,
                
                    sharesArray = JSON.parse(request.body).sharesArray


                //Build the structure we need
                let sharedPayload=vvList.map(

                    (vv,index) => ({verificationVector:vv,secretKeyShare:sharesArray[index]})

                )
                
                reply.send(tblsMod.signTBLS(hexMyId,sharedPayload,message))


            }else if(operation==='buildFullSignature'){
                

                 /*

                    signaturesArray - [ {sigShare:signedShareA,id:hexIdA}, {sigShare:signedShareB,id:hexIdB},... {sigShare:signedShareX,id:hexIdX} ]

                */

                reply.send(tblsMod.buildSignature(params))
            
            }
            else if(operation==='verify'){
                
                let [hexGroupPubKey,hexMasterSignature,signedMessage]=params.split(':')
                
                reply.send(tblsMod.verifyTBLS(hexGroupPubKey,hexMasterSignature,signedMessage))
            
            }

        }
        
        
        
        
        else if(scope==='pqc'){

            let index=(await import('../../../KLY_Addons/index.js')).default

            return index.action(operation,params)
            
        }

    })



    // ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗███████╗
    // ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝██╔════╝
    // ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  ███████╗
    // ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  ╚════██║
    // ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗███████║
    // ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝╚══════╝
    
    fastify.get('/services',(request, reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/services.ejs')
        
    )


    fastify.get('/services/build',(request, reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/services.ejs')
        
    )

    fastify.get('/services/interact',(request, reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/services.ejs')
        
    )

    // ███████╗██╗   ██╗███╗   ███╗██████╗ ██╗ ██████╗ ████████╗███████╗███████╗
    // ██╔════╝╚██╗ ██╔╝████╗ ████║██╔══██╗██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
    // ███████╗ ╚████╔╝ ██╔████╔██║██████╔╝██║██║   ██║   ██║   █████╗  ███████╗
    // ╚════██║  ╚██╔╝  ██║╚██╔╝██║██╔══██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
    // ███████║   ██║   ██║ ╚═╝ ██║██████╔╝██║╚██████╔╝   ██║   ███████╗███████║
    // ╚══════╝   ╚═╝   ╚═╝     ╚═╝╚═════╝ ╚═╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

    fastify.get('/symbiotes', (request, reply) =>
    
        handler(reply,'KLY_Modules/init/ui/templates/symbiotes.ejs')
        
    )


    // ███╗   ███╗██╗   ██╗    ███████╗███╗   ███╗██████╗ ██╗██████╗ ███████╗
    // ████╗ ████║╚██╗ ██╔╝    ██╔════╝████╗ ████║██╔══██╗██║██╔══██╗██╔════╝
    // ██╔████╔██║ ╚████╔╝     █████╗  ██╔████╔██║██████╔╝██║██████╔╝█████╗  
    // ██║╚██╔╝██║  ╚██╔╝      ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║██╔══██╗██╔══╝  
    // ██║ ╚═╝ ██║   ██║       ███████╗██║ ╚═╝ ██║██║     ██║██║  ██║███████╗
    // ╚═╝     ╚═╝   ╚═╝       ╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝

    fastify.get('/empire',(request, reply)=>
    
        handler(reply,'KLY_Modules/init/ui/templates/empire.ejs')
    
    )


    // ███╗   ███╗██╗███████╗ ██████╗
    // ████╗ ████║██║██╔════╝██╔════╝
    // ██╔████╔██║██║███████╗██║        
    // ██║╚██╔╝██║██║╚════██║██║     
    // ██║ ╚═╝ ██║██║███████║╚██████╗
    // ╚═╝     ╚═╝╚═╝╚══════╝ ╚═════╝
                                                                      

    fastify.get('/misc',(request,reply)=>

        handler(request,'KLY_Modules/init/ui/templates/misc.ejs')
        
    )


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


    fastify.get('/update/:param/:value', (request, reply) => {
    
        CONFIGURATION.DEFAULT[request.params.param]=request.params.value

        reply.send(1)
    
    })
   
    next()

}