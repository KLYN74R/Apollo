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

program

        .command('keygen')
        .alias('k')
        .option('-t, --type <value>','Crypto project name','klyntar')

        .description(`\x1b[32mGenerate new keypair\x1b[0m`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


        
program

        .command('listkeys')
        .alias('l')
        .description(`\x1b[32mList all supported key formats by ValarDohaeris\x1b[0m`)
        .action(async()=>
        
            import('@klyntar/valardohaeris/vd.js').then(mod=>console.log(mod.SUPPORTED_FORMATS))
            
        )



                
program

        .command('listspec')
        .alias('ls')
        .option('-t, --type <value>','Crypto project name','klyntar')
        .description(`\x1b[32mList specific functions of some crypto(e.g. address format changes,set mnemo size etc.)\x1b[0m`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>
    
                console.log(m.default.spec)
                
            ).catch(e=>false)
            
        )



        
program

        .command('sign')
        .alias('s')

        .option('-t, --type <value>','Crypto project name','klyntar')
        .requiredOption('-k, --privatekey <value>','Private key to sign data')
        .option('-p, --path <value>','Path to file with payload to sign or payload itself but with prefix P:','payload.txt')
        
        .description(`\x1b[32mSign the message or content(by path)\x1b[0m`)
        
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>{

                let data=opts.path.startsWith('P:')?opts.path.slice(2):fs.readFileSync(opts.path).toString('utf-8')

                return await m.default.sign(data,opts.privatekey)

            }).then(console.log).catch(e=>false)
            
        )


        


        
program

        .command('verify')
        .alias('v')

        .option('-t, --type <value>','Crypto project name','klyntar')
        .requiredOption('-k, --pubkey <value>','Pubkey to verify')
        .option('-s, --sigpath <value>','Path to signature file to verify or signature itself but with prefix S:','signature.txt')
        .option('-p, --path <value>','Path to file with payload to verify or payload itself but with prefix P:','payload.txt')

        .description(`\x1b[32mVerify signed message or content(by path)\x1b[0m`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(async m=>{
    
                let data=opts.path.startsWith('P:')?opts.path.slice(2):fs.readFileSync(opts.path).toString('utf-8'),

                    signature=opts.sigpath.startsWith('S:')?opts.sigpath.slice(2):fs.readFileSync(opts.sigpath).toString('utf-8')
    
       
                return await m.default.verify(data,signature,opts.pubkey)
    
            }).then(console.log).catch(e=>false)
            
        )


program

        .command('encrypt')
        .alias('e')
        .requiredOption('-s, --privatekey <value>','private key to encrypt')
        .requiredOption('-p, --password <value>','password for AES encryption')

        .description(`\x1b[32mEncrypts private keys via \x1b[36;1mAES-256\x1b[0m\x1b[32m symmetric algorithm to paste ciphertext to configs or for secured storage\x1b[0m`)
        
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
        .requiredOption('-e, --encprv <cipherText>','Encrypted private key')
        .requiredOption('-p, --password <value>','password for AES decryption')

        .description(`\x1b[32mDecrypts private keys via \x1b[36;1mAES-256\x1b[0m\x1b[32m symmetric algorithm. Be careful and avoid 3rd party eyes around you!\x1b[0m`)
        
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

        .command('ui')
        .option('-p, --port <value>','Port to run web UI',9999)
        .option('-m, --mod <value>','You can set module to override default Apollo UI behavior')
        .option('-i, --interface <value>','interface to run server','::')
        .addHelpText('before',`
        
        ********************************************************
        * You can also use configs to set flags & other values *
        ********************************************************
        
        `)
        .description(`\x1b[32mRun web UI for more comfortable use\x1b[0m`)
        .action(async(opts,_cmd)=>{
            
            import('uWebSockets.js').then(module=>{

                let UWS=module.default
                
                UWS.App()
                
                    .get('/',(a,q)=>{
                    
                        a.end(`Hello from KLYNTAR@UI`)
                    
                    }).listen(opts.port,opts.interface,ok=>console.log(`UI is available on \x1b[32;1m[${opts.interface}]:${opts.port}\x1b[0m`))

            
            }).catch(e=>false)
        
        })
        



program

        .command('vanity')

        .requiredOption('-p, --prefix <value>','prefix for vanity address.Note:it`s only for Klyntar format(and Solana)')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        .option('-v, --verbose','track generation process')
        
        .description(`\x1b[32mGenerate your vanity \x1b[31;1mKlyntar\x1b[0m\x1b[32m address with choosen prefix\x1b[0m`)
        
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
        



program

        .command('thresholdsig')
        .alias('ts')
        .description(`\x1b[32mModule to work with threshold signatures(currently \u001b[38;5;153mTBLS\x1b[0m\x1b[32m based on \u001b[38;5;96mBLS12-381\x1b[0m\x1b[32m)\x1b[0m`)

        .addCommand(
            
            program.createCommand('generate').alias('gs')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number <value>','initial number of signers')
            .option('-i, --id <value>','your id')
            .option('-s, --signers <id1,id2,...idN>','Array of IDs of other participants splitted by coma.')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            .description('To generate your verification vector,secret shares for other signers and so on')
            .action((async(opts,_cmd)=>{
            
                let bundle=(await import('./signatures/tbls.js')).default

                console.log(bundle)
        
            }))
        
        )
        .addCommand(
            
            program.createCommand('verify-share')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            .description('Verify share received by participant')
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        .addCommand(
            
            program.createCommand('sign')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            .description('Sign some data')
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        .addCommand(
            
            program.createCommand('verify')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            .description('Verify signature')
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        
    




program

        .command('multisig')
        .alias('ms')
        .description(`\x1b[32mModule to work with multisignatures(currently \u001b[38;5;199mBLS/Schnorr\x1b[0m\x1b[32m)\x1b[0m`)

        .addCommand(
            
            program.createCommand('generate')
        
            .option('-t, --threshold <value>','numbers of signers to be able to generate valid signature')
            .option('-n, --number','initial number of signers')
            .option('-m, --mod <value>','You can set module to override default Apollo behavior')
            
            .action((async(opts,_cmd)=>{
            
                console.log('Hello subcommand')
        
            }))
        
        )
        
        .addCommand(program.createCommand('sign'))
        //Add this option to explain users what to do with generated values(because most of these algorithms are new to people)

        .action(async(opts,_cmd)=>{

            //Addons will be available only in Linux env first time
            if(process.platform==='linux'){

                //Fix to load addons. For node v17.9.0 it's still impossible to load addons to ESM environment
                //See https://stackoverflow.com/a/66527729/18521368

                let { createRequire } = await import('module'),
                
                    require = createRequire(import.meta.url),

                    ADDONS = require('./KLY_Addons/build/Release/BUNDLE');


                console.log(opts)

                if(opts.list) console.log(ADDONS)
                else{

                }
                

            } else console.log('\x1b[31;1mPost-quantum cryptography available only in Linux env.Please,compile addons and try again\x1b[0m')

        })


program

        .command('service')
        .description(`\x1b[32mTo work with services/conveyors etc.\x1b[0m`)
        .option('-p, --path <value>','')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        .action(async(opts,_cmd)=>{

            console.log(opts)
        
        })
        


program

        .command('build-service')
        .alias('bs')
        .description(`\x1b[32mTo prepare metadata,verify service and build an archive\x1b[0m`)
        .option('-p, --path <value>','Path to directory with service')
        .option('-z, --zip_path <value>','Path in ZIP')
        .option('-d, --dest <value>','Write archive with service here')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')
        .action(async(opts,_cmd)=>{

            let {hash}=await import('blake3-wasm'),

            admZip=(await import('adm-zip')).default,

            BLAKE3=v=>hash(v).toString('hex')

            //Creating archives
            let zip = new admZip()

            // add directory
            zip.addLocalFolder(opts.path,opts.zip_path)
            
            // get everything as a buffer
            let fingerPrint=BLAKE3(zip.toBuffer())

            console.log(fingerPrint)

            //Write archive
            zip.writeZip(opts.dest)

            
        })


program
        .command('init-symbiote')
        .alias('is')
        .description(`\x1b[32mTo prepare configs,directories and structures for your symbiote\x1b[0m`)
        .option('-n, --net <value>','Set mode for your symbiote(mainnet/tesnet)','test')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')

        .action(async(opts,_cmd)=>{

            console.log(opts)
        
        })
        



program
        .command('verify-configs')
        .alias('vc')
        .description(`\x1b[32mVerify your configuration for jsymbiote\x1b[0m`)
        .option('-p, --path <value>','Path to symbiotes.json')
        .option('-m, --mod <value>','You can set module to override default Apollo behavior')

        .action(async(opts,_cmd)=>{

            console.log(opts)
        
        })

program.parse(process.argv)