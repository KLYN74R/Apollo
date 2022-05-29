#!/usr/bin/env node

//_________________________________________________________________________ IMPORTS POOL _________________________________________________________________________


import {program} from 'commander'
import fs from 'fs'


//__________________________________________________________________________ IMPORTS POOL _________________________________________________________________________


global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

const PATH_RESOLVE=path=>__dirname+'/'+path



const banner=fs.readFileSync(PATH_RESOLVE('images/banner.txt')).toString('utf-8')
            .replaceAll('█','\u001b[38;5;50m█\x1b[0m')
            .replaceAll('*','\u001b[38;5;50m*\x1b[0m')
            .replaceAll('^','\u001b[38;5;171m*\x1b[0m')
            .replaceAll('Q','\u001b[38;5;196mK\x1b[0m')
            .replaceAll('W','\u001b[38;5;196mL\x1b[0m')
            .replaceAll('E','\u001b[38;5;196mY\x1b[0m')

            //UA
            .replaceAll('&','\u001b[38;5;57m@\x1b[0m')
            .replaceAll('!','\u001b[38;5;191m@\x1b[0m')
            
            .replace(`by KlyntarTeam`,`\u001b[38;5;9mby KlyntarTeam\x1b[0m`)
            .replace(`https://github.com/KLYN74R/Apollo`,`\u001b[38;5;23mhttps://github.com/KLYN74R/Apollo\x1b[0m`)




global.CONFIG=JSON.parse(fs.readFileSync(PATH_RESOLVE('./config.json')))




//_________________________________________________________________________ CLI COMMANDS _________________________________________________________________________




program
    .name('apollo')
    .version(fs.readFileSync(PATH_RESOLVE('images/version.txt')).toString('utf-8').replaceAll('QWERTY','Apollo@v2.0.0 by KlyntarTeam'))
    .description(banner)
    .usage('[COMMAND] [FLAGS]')





/*

88                                                          88                         
88                                                          ""                         
88                                                                                     
88   ,d8   ,adPPYba,  8b       d8  8b,dPPYba,   ,adPPYYba,  88  8b,dPPYba,  ,adPPYba,  
88 ,a8"   a8P_____88  `8b     d8'  88P'    "8a  ""     `Y8  88  88P'   "Y8  I8[    ""  
8888[     8PP"""""""   `8b   d8'   88       d8  ,adPPPPP88  88  88           `"Y8ba,   
88`"Yba,  "8b,   ,aa    `8b,d8'    88b,   ,a8"  88,    ,88  88  88          aa    ]8I  
88   `Y8a  `"Ybbd8"'      Y88'     88`YbbdP"'   `"8bbdP"Y8  88  88          `"YbbdP"'  
                          d8'      88                                                  
                         d8'       88                                                  

*/


program

        .command('keygen')
        .alias('k')
        .description(`\x1b[32mGenerate new keypair\x1b[0m`)

        .option('-t, --type <value>','Crypto project name','klyntar')
        
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>console.log(`\x1b[31;1mCan't find appropriate module. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
        )


        
program

        .command('listkeys')
        .alias('l')
        .description(`\x1b[32mList all supported key formats by ValarDohaeris\x1b[0m`)

        .action(async()=>
        
            import('@klyntar/valardohaeris/vo.js').then(mod=>console.log(mod.SUPPORTED_FORMATS)).catch(e=>console.log(`\x1b[31;1mCan't find VD module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
        )



                
program

        .command('listspec')
        .alias('ls')
        .description(`\x1b[32mList specific functions of some crypto(e.g. address format changes,set mnemo size etc.)\x1b[0m`)

        .option('-t, --type <value>','Crypto project name','klyntar')
        
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>
    
                console.log(m.default.spec)
                
            ).catch(e=>console.log(`\x1b[31;1mCan't find VD module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
        )



        
program

        .command('sign')
        .alias('s')
        .description(`\x1b[32mSign the message or content(by path)\x1b[0m`)

        .option('-t, --type <value>','Crypto project name','klyntar')
        .requiredOption('-k, --privatekey <value>','Private key to sign data')
        .option('-p, --path <value>','Path to file with payload to sign or payload itself but with prefix P:','payload.txt')
        
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>{

                let data=opts.path.startsWith('P:')?opts.path.slice(2):fs.readFileSync(opts.path).toString('utf-8')

                return await m.default.sign(data,opts.privatekey)

            }).then(console.log).catch(e=>console.log(`\x1b[31;1mCan't find VD module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
        )


        


        
program

        .command('verify')
        .alias('v')
        .description(`\x1b[32mVerify signed message or content(by path)\x1b[0m`)

        .option('-t, --type <value>','Crypto project name','klyntar')
        .requiredOption('-k, --pubkey <value>','Pubkey to verify')
        .option('-s, --sigpath <value>','Path to signature file to verify or signature itself but with prefix S:','signature.txt')
        .option('-p, --path <value>','Path to file with payload to verify or payload itself but with prefix P:','payload.txt')

        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>{
    
                let data=opts.path.startsWith('P:')?opts.path.slice(2):fs.readFileSync(opts.path).toString('utf-8'),

                    signature=opts.sigpath.startsWith('S:')?opts.sigpath.slice(2):fs.readFileSync(opts.sigpath).toString('utf-8')
    
       
                return await m.default.verify(data,signature,opts.pubkey)
    
            }).then(console.log).catch(e=>console.log(`\x1b[31;1mCan't find VD module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
        )


program

        .command('encrypt')
        .alias('e')
        .description(`\x1b[32mEncrypts private keys via \x1b[36;1mAES-256\x1b[0m\x1b[32m symmetric algorithm to paste ciphertext to configs or for secured storage\x1b[0m`)
        
        .requiredOption('-s, --privatekey <value>','private key to encrypt')
        .requiredOption('-p, --password <value>','password for AES encryption')
        
        .action(async(opts,_cmd)=>{


            let crypto=await import('crypto')
            
            //_____________________________________________Prepare key and initialization vector_____________________________________________
            
            
            let password_hash = crypto.createHash('sha256').update(opts.password,'utf-8').digest('hex'),
            
                IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
            
                password_hash=password_hash.slice(0,32)//We need first 16 bytes
            
            
            //_______________________________________________________Start encryption________________________________________________________
            
            
            let cipher = crypto.createCipheriv('aes-256-cbc',password_hash,IV)
            
            console.log(cipher.update(opts.privatekey,'utf8','hex') + cipher.final('hex'))

        
        })


program

        .command('decrypt')
        .alias('d')
        .description(`\x1b[32mDecrypts private keys via \x1b[36;1mAES-256\x1b[0m\x1b[32m symmetric algorithm. Be careful and avoid 3rd party eyes around you!\x1b[0m`)

        .requiredOption('-e, --encprv <cipherText>','Encrypted private key')
        .requiredOption('-p, --password <value>','password for AES decryption')
        
        .action(async(opts,_cmd)=>{

            let crypto=await import('crypto')
               
            //_____________________________________________Prepare key and initialization vector_____________________________________________
            
            
            let password_hash = crypto.createHash('sha256').update(opts.password,'utf-8').digest('hex'),
            
                IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
            
                password_hash=password_hash.slice(0,32)//We need first 16 bytes
                       
            
            //________________________________________________________Decrypt values_________________________________________________________
            
            try{
            
                let decipher = crypto.createDecipheriv('aes-256-cbc',password_hash,IV)
            
                console.log(decipher.update(opts.encprv,'hex','utf8')+decipher.final('utf8'))

            }catch{ console.log('\x1b[31;1mFailed\x1b[0m') }

        
        })
        


program

        .command('vanity').description(`\x1b[32mGenerate your vanity \x1b[31;1mKlyntar\x1b[0m\x1b[32m address with choosen prefix\x1b[0m`)

        .requiredOption('-p, --prefix <value>','prefix for vanity address.Note:it`s only for Klyntar format(and Solana)')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        .option('-v, --verbose','track generation process')
        
        .action(async(opts,_cmd)=>{

            let {isMainThread,Worker} = await import('worker_threads')

            if(['0','O','I','l','+','/'].some(x=>opts.prefix.includes(x))){
 
                console.log('Be careful!. Klyntar addresses are Base58 so no symbols 0,O,I,l,+,/ in prefix are possible')
 
                process.exit()
            }

            //_________________ BANNER _________________

            console.log(`\u001b[38;5;168m`)
            
            let banner=fs.readFileSync(PATH_RESOLVE('images/vanity.txt')).toString('utf-8')
            
            console.log(banner)



            let os = await import('os'),

                numProc = os.cpus().length

            console.log(`\n\n\x1b[32mKlyntar started with maximum number of threads for your machine(\x1b[36m${numProc}\x1b[32m)\x1b[0m`)


            //_________________ RUN CYCLE _________________

            for(let i=0;i<numProc;i++){

                console.log(`Spawned ${i}`)
              
                if (isMainThread) {
                  
                    const worker = new Worker(PATH_RESOLVE('vanity_worker.js'))
              
                    worker.on('message',data=>{

                        console.log(`Worker [${data.WORKER_ID}](attempts:${data.attempts})`)
                        
                        console.log(data.pair)

                        if(data.v){

                            process.exit()

                        }

                    })

                    worker.postMessage({id:worker.threadId,prefix:opts.prefix,v:opts.verbose})
                            
                }
              
            }
        
        })




/*

                                                                                                                                             
                                                                                                                                             
                                       ,d                                                            ,d                                      
                                       88                                                            88                                      
8b,dPPYba,    ,adPPYba,   ,adPPYba,  MM88MMM      ,adPPYb,d8  88       88  ,adPPYYba,  8b,dPPYba,  MM88MMM  88       88  88,dPYba,,adPYba,   
88P'    "8a  a8"     "8a  I8[    ""    88        a8"    `Y88  88       88  ""     `Y8  88P'   `"8a   88     88       88  88P'   "88"    "8a  
88       d8  8b       d8   `"Y8ba,     88        8b       88  88       88  ,adPPPPP88  88       88   88     88       88  88      88      88  
88b,   ,a8"  "8a,   ,a8"  aa    ]8I    88,       "8a    ,d88  "8a,   ,a88  88,    ,88  88       88   88,    "8a,   ,a88  88      88      88  
88`YbbdP"'    `"YbbdP"'   `"YbbdP"'    "Y888      `"YbbdP'88   `"YbbdP'Y8  `"8bbdP"Y8  88       88   "Y888   `"YbbdP'Y8  88      88      88  
88                                                        88                                                                                 
88                                                        88 

*/



program

        .command('pqc')
        .description(`\x1b[32mModule to work with post-quantum crypto\x1b[0m`)
        
        .option('-l, --list','List available functions set and how to use them')
        .option('-f, --function <value>','call function of one of the supported formats')
        .option('-p, --parameters <comma splitted params>','pass params to function splitted by comma')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        .option('-o, --output <path>','Path to write your keypair to file in JSON format')
        
        .action(async(opts,_cmd)=>{

            //Addons will be available only in Linux env first time
            if(process.platform==='linux'){

                //_________________________ IMPORTS SECTION _________________________

                let index=(await import('./KLY_Addons/index.js')).default
    
                opts.list?index.list():index.action(opts.function,opts.parameters)//call function and pass params if function need it
    
            } else console.log('\x1b[31;1mPost-quantum cryptography available only in Linux env.Please,compile addons and try again\x1b[0m')

        })
        
        
        
program

        .command('checkrepo')
        .description(`\x1b[32mVerify commits,repositories by \u001b[38;5;105mKlyntarTeam\x1b[0m\x1b[32m or by other devs\x1b[0m`)
        .alias('cr')
        
        .option('-p, --path','Path to repository')
        .option('-m, --meta','required metadata e.g. multisig pubkey etc.')
        
        .action(async(opts,_cmd)=>{

            //
 
        })
        

/*

                                                                                                    
         88                                              88                        88           88  
  ,d     88                                              88                        88           88  
  88     88                                              88                        88           88  
MM88MMM  88,dPPYba,   8b,dPPYba,   ,adPPYba,  ,adPPYba,  88,dPPYba,    ,adPPYba,   88   ,adPPYb,88  
  88     88P'    "8a  88P'   "Y8  a8P_____88  I8[    ""  88P'    "8a  a8"     "8a  88  a8"    `Y88  
  88     88       88  88          8PP"""""""   `"Y8ba,   88       88  8b       d8  88  8b       88  
  88,    88       88  88          "8b,   ,aa  aa    ]8I  88       88  "8a,   ,a8"  88  "8a,   ,d88  
  "Y888  88       88  88           `"Ybbd8"'  `"YbbdP"'  88       88   `"YbbdP"'   88   `"8bbdP"Y8  
                                                                                                   

*/


program

        .command('thresholdsig')
        .alias('ts')
        .description(`\x1b[32mModule to work with threshold signatures(currently \u001b[38;5;153mTBLS\x1b[0m\x1b[32m based on \u001b[38;5;96mBLS12-381\x1b[0m\x1b[32m)\x1b[0m`)

        .addCommand(
            
            program.createCommand('generate').alias('gs').description('To generate your verification vector,secret shares for other signers and so on')
        
            .requiredOption('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .requiredOption('-i, --id <value>','your id')
            .requiredOption('-s, --signers <id1,id2,...idN>','Array of IDs of other participants splitted by coma.')
            .option('-p, --path <value>','Path to .json file to store generated data','your_tbls.json')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((opts,_cmd)=>
            
                import('./signatures/threshold/tbls.js').then(

                    bundle => fs.writeFileSync(opts.path,bundle.default.generateTBLS(+opts.threshold,opts.id,opts.signers.split(',')))

                ).catch(e=>console.log(`\x1b[31;1mCan't find module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
  
            )
        
        )
        .addCommand(
            
            program.createCommand('verify-share').alias('vs').description('Verify share received by participant')
        
            .requiredOption('-i, --id <value>','your id in hex format')
            .requiredOption('-s, --secret <value>','secret share contribution received by someone in hex format')
            .requiredOption('-v, --vector <v1,v2,...vN>','verification vector received from some signer')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((opts,_cmd)=>
            
                import('./signatures/threshold/tbls.js').then(
                    
                    bundle => bundle.default.verifyShareTBLS(opts.id,opts.secret,opts.vector.split(','))
                
                ).catch(e=>console.log(`\x1b[31;1mCan't find module.Run \x1b[36;1mpnpm install\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))

            )
        
        )
        .addCommand(
            
            program.createCommand('partialsign').alias('ps').description('Sign some data')
        
            .option('-i, --id <value>','your id in hex format')
            .option('-s, --shared-payload-path','Path to specific struct. Read more https://mastering.klyntar.org/beginning/cryptography/multi-threshold-aggregated-signatures')
            .option('-d, --data <value>','text data to sign')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        .addCommand(
            
            program.createCommand('buildsig').alias('bs').description('Build general signature from sigshares')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        .addCommand(
            
            program.createCommand('verify').alias('v').description('Verify signature')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        
    
program

        .command('ringsig').alias('rs').description(`\x1b[32mTo work with ring signatures etc.\x1b[0m`)
        
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        
        .addCommand(

            program.createCommand('generate').alias('g')
        
            .description('Generate LRS keypair')

            .action((_,__)=>

                import('module').then(
                
                    mod => mod.createRequire(import.meta.url)
                
                ).then(require=>{

                    let {Wallet} = require('./signatures/ringsig/lrs-ecdsa/export.js')

                    const w = Wallet.createRandom()
                    console.log({
                        privateKey: w.privateKey,
                        publicKey: w.signingKey.publicKey,
                        address:w.address
                    })

                }).catch(e=>console.log(`\x1b[31;1mCan't find module/build.Run \x1b[36;1mpnpm build\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            )

        ).addCommand(

            program.createCommand('sign').alias('s').description('Generate linkable ring signature')
            
            .option('-p, --privkey <value>','Your private key')
            .option('-d, --data <value>','Data to sign')
            .option('-r, --ring <value1,value2,...valueN>','Public keys of other ring members splitted by comma')
            
            .action((opts,_cmd)=>

                import('module').then(
                
                    mod => mod.createRequire(import.meta.url)
                
                ).then(require=>{

                        let {sign,serializeRingSigtoHex} = require('./signatures/ringsig/lrs-ecdsa/export.js')

                        console.log('\n\n==================== SIGNATURE(copy this hexadecimal payload) ====================\n')
                        console.log(serializeRingSigtoHex(sign(opts.data,opts.privkey,opts.ring.split(','))))
                  
                    }
                    
                ).catch(e=>console.log(`\x1b[31;1mCan't find module/build.Run \x1b[36;1mpnpm build\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
            )

        ).addCommand(

            program.createCommand('verify').alias('v').description('Verify LRS signature')

            .option('-s, --signature <value>','Signature in JSON')

            .action((opts,_cmd)=>

                import('module').then(
                
                    mod => mod.createRequire(import.meta.url)
                
                ).then(require=>{

                    let {verify,deserializeRingSig} = require('./signatures/ringsig/lrs-ecdsa/export.js')
                    
                    let signa=JSON.parse(Buffer.from(opts.signature,'hex')),

                        [hexKeys,signature]=deserializeRingSig(signa)

                    console.log(verify(signature,hexKeys))

                }).catch(e=>console.log(`\x1b[31;1mCan't find module/build.Run \x1b[36;1mpnpm build\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            )

        )

        .addCommand(

            program.createCommand('link').alias('l').description('Check if LRS signature was signed by the same signer')
            
            .requiredOption('-s1, --signature1 <value>','Signature1 in hex')
            .requiredOption('-s2, --signature2 <value>','Signature2 in hex')

            .action((opts,_cmd)=>

                import('module').then(
                
                    mod => mod.createRequire(import.meta.url)
                
                ).then(require=>{

                    let {link,deserializeRingSig} = require('./signatures/ringsig/lrs-ecdsa/export.js')
                    
                    let signa1=JSON.parse(Buffer.from(opts.signature1,'hex')),

                        signa2=JSON.parse(Buffer.from(opts.signature2,'hex'))
                    
                    console.log(link(deserializeRingSig(signa1)[1],deserializeRingSig(signa2)[1]))

                }).catch(e=>console.log(`\x1b[31;1mCan't find module/build.Run \x1b[36;1mpnpm build\x1b[31;1m if you don't have installed packages. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
            
            )

        )





/*

                                                                              
                                 88           88             88               
                                 88    ,d     ""             ""               
                                 88    88                                     
88,dPYba,,adPYba,   88       88  88  MM88MMM  88  ,adPPYba,  88   ,adPPYb,d8  
88P'   "88"    "8a  88       88  88    88     88  I8[    ""  88  a8"    `Y88  
88      88      88  88       88  88    88     88   `"Y8ba,   88  8b       88  
88      88      88  "8a,   ,a88  88    88,    88  aa    ]8I  88  "8a,   ,d88  
88      88      88   `"YbbdP'Y8  88    "Y888  88  `"YbbdP"'  88   `"YbbdP"Y8  
                                                                  aa,    ,88  
                                                                   "Y8bbdP"  

*/
        
program.command('multisig').alias('ms').description(`\x1b[32mModule to work with multisignatures(currently \u001b[38;5;199mBLS/Schnorr\x1b[0m\x1b[32m)\x1b[0m`)

        .addCommand(
            
            program.createCommand('generate').alias('g').description('Generate BLS keypair')

            .action(async(_,__)=>{

                let MOD = (await import('./signatures/multisig/bls.js')).default,

                        privateKey = await MOD.generatePrivateKey(),

                        pubKey=MOD.derivePubKey(privateKey)


                console.log({privateKey,pubKey})

            })
        
        )

        .addCommand(
            
            program.createCommand('sign').alias('s').description('Get simple BLS signature')

            .option('-p, --privateKey <value>','Your BLS privatekey')
            .option('-d, --data <value>','Data to sign')
           
            .action(async(opts,_cmd)=>{

                let MOD = (await import('./signatures/multisig/bls.js')).default

                console.log(await MOD.singleSig(opts.data,opts.privateKey))

            })
        
        )

        .addCommand(
            
            program.createCommand('verify').alias('v').description('Verify single sig')

            .option('-p, --pubKey <value>','Your BLS public key(it`s address btw)')
            .option('-d, --data <value>','Data to sign')
            .option('-s, --signa <value>','Signature')

            .action(async(opts,_cmd)=>{

                let MOD = (await import('./signatures/multisig/bls.js')).default

                console.log(await MOD.singleVerify(opts.data,opts.pubKey,opts.signa))

            })
        
        )





/*
                                                                                       
                                                88                                     
                                                ""                                     
                                                                                       
,adPPYba,   ,adPPYba,  8b,dPPYba,  8b       d8  88   ,adPPYba,   ,adPPYba,  ,adPPYba,  
I8[    ""  a8P_____88  88P'   "Y8  `8b     d8'  88  a8"     ""  a8P_____88  I8[    ""  
 `"Y8ba,   8PP"""""""  88           `8b   d8'   88  8b          8PP"""""""   `"Y8ba,   
aa    ]8I  "8b,   ,aa  88            `8b,d8'    88  "8a,   ,aa  "8b,   ,aa  aa    ]8I  
`"YbbdP"'   `"Ybbd8"'  88              "8"      88   `"Ybbd8"'   `"Ybbd8"'  `"YbbdP"'  


*/

program

        .command('service')
        .description(`\x1b[32mTo work with services/conveyors etc.\x1b[0m`).addCommand(


            program.createCommand('build').alias('bs').description(`\x1b[32mTo prepare metadata,verify service and build an archive\x1b[0m`)
            
            .option('-p, --path <value>','Path to directory with service')
            .option('-z, --zip_path <value>','Path in ZIP')
            .option('-d, --dest <value>','Write archive with service here')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action(async(opts,_cmd)=>{

            let {hash}=await import('blake3-wasm'),

                admZip=(await import('adm-zip')).default,

                BLAKE3=v=>hash(v).toString('hex'),

                //Creating archives
                zip = new admZip()

            // add directory
            zip.addLocalFolder(opts.path,opts.zip_path)
            
            // get everything as a buffer
            let fingerPrint=BLAKE3(zip.toBuffer())

            console.log(fingerPrint)

            //Write archive
            zip.writeZip(opts.dest)

            
        })

        ).addCommand(

            program.createCommand('interact').alias('i').description(`\x1b[32mTo interact with services\x1b[0m`)
            
            .option('-m, --mod <value>','You can set module of service API to work with it')
            
            .action(async(opts,_cmd)=>{

        
                console.log('Coming soon :)')
            
            })

        ).addCommand(

            program.createCommand('load').alias('l').description(`\x1b[32mLoad service repository\x1b[0m`)
            
            .option('-m, --mod <value>','You can set module of service API to work with it')
            
            .action(async(opts,_cmd)=>{

        
                console.log('Coming soon :)')
            
            })

        ).addCommand(

            program.createCommand('scan').alias('i').description(`\x1b[32mTo scan service directory for vulns & malware & other stuff\x1b[0m`)
            
            .option('-m, --mod <value>','You can set module of service API to work with it')
            
            .action(async(opts,_cmd)=>{

        
                console.log('Coming soon :)')
            
            })

        )


/*


                                                          
                     88                                   
              ,d     88                                   
              88     88                                   
 ,adPPYba,  MM88MMM  88,dPPYba,    ,adPPYba,  8b,dPPYba,  
a8"     "8a   88     88P'    "8a  a8P_____88  88P'   "Y8  
8b       d8   88     88       88  8PP"""""""  88          
"8a,   ,a8"   88,    88       88  "8b,   ,aa  88          
 `"YbbdP"'    "Y888  88       88   `"Ybbd8"'  88          
                                                     

*/


program
        .command('init-symbiote').alias('is').description(`\x1b[32mTo prepare configs,directories and structures for your symbiote\x1b[0m`)
        
        .option('-n, --net <value>','Set mode for your symbiote(mainnet/tesnet)','test')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')

        .action(async(opts,_cmd)=>{

            console.log('Coming soon :)')
        
        })
        

program
        .command('verify-configs').alias('vc').description(`\x1b[32mVerify your configuration for symbiote\x1b[0m`)

        .option('-p, --path <value>','Path to symbiotes.json')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')

        .action(async(opts,_cmd)=>{

            console.log('Coming soon :)')
        
        })




program
        .command('events').alias('ev').description(`\x1b[32mTo work with events on some symbiote and workflows' API\x1b[0m`)
        
        .option('-a, --api <workflow>','You can set appropriate API to interact with symbiotes and compatible workflowss')
        .option('-c, --payload <value>','Pass payload.Set to "usage" to get examples & manual')
        .option('-m, --method <value>','Method to use')

        .action(async(opts,_cmd)=>

            import(`./KLY_WorkflowsAPI/${opts.api}/cli/index.js`).then(
                
                mod => mod.default
                
            ).then(
                
                m => m[opts.method](opts.payload)
                
            ).catch(e=>console.log(`\x1b[31;1mCan't find appropriate API. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
        
        )




program
        .command('stats').alias('st').description(`\x1b[32mGet statistic data about your Klyntar infrastructure\x1b[0m`)
        
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')

        .action(async(opts,_cmd)=>{

            console.log('Coming soon :)')
        
        })




program

        .command('ui').description(`\x1b[32mRun web UI for more comfortable use\x1b[0m`)

        .option('-p, --port <value>','Port to run web UI',9999)
        .option('-m, --mod <value>','You can set module to override default Apollo UI behavior')
        .option('-i, --interface <value>','interface to run server','::')
        
        .addHelpText('before',`
        
        ********************************************************
        * You can also use configs to set flags & other values *
        ********************************************************
        
        `)
        
        .action(async(opts,_cmd)=>{

            console.log('Serivces dir => ',fs.readdirSync(PATH_RESOLVE('KLY_ServicesAPI')))
            console.log('Workflows dir => ',fs.readdirSync(PATH_RESOLVE('KLY_WorkflowsAPI')))
            
            import('uWebSockets.js').then(module=>{

                let UWS=module.default
                
                UWS.App()
                
                    .get('/',(a,q)=>{
                    
                        a.end(`Hello from KLYNTAR@UI`)
                    
                    }).listen(opts.port,opts.interface,ok=>console.log(`UI is available on \x1b[32;1m[${opts.interface}]:${opts.port}\x1b[0m`))

            
            }).catch(e=>console.log(`\x1b[31;1mCan't find module. Use \x1b[36;1m-h\x1b[31;1m to get the help\x1b[0m`))
        
        })



program.parse(process.argv)