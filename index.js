#!/usr/bin/env node

import {SUPPORTED_FORMATS} from '@klyntar/valardohaeris/vd.js'
import{isMainThread,Worker} from'worker_threads'
// import { createRequire } from 'module'
import {program} from 'commander'
import crypto from'crypto'
import pkg from 'inquirer'
import fs from 'fs'
import os from 'os'




//Fix to load addons. For node v17.9.0 it's still impossible to load addons to ESM environment
//See https://stackoverflow.com/a/66527729/18521368
// const require = createRequire(import.meta.url),

//       ADDONS = require('./KLY_Addons/build/Release/BUNDLE');



const { prompt } = pkg


global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

let PATH_RESOLVE=path=>__dirname+'/'+path



let banner=fs.readFileSync(PATH_RESOLVE('images/banner.txt')).toString('utf-8')
            .replaceAll('█','\u001b[38;5;50m█\x1b[0m')
            .replaceAll('*','\u001b[38;5;50m*\x1b[0m')
            .replaceAll('Q','\u001b[38;5;196mK\x1b[0m')
            .replaceAll('W','\u001b[38;5;196mL\x1b[0m')
            .replaceAll('E','\u001b[38;5;196mY\x1b[0m')

            //UA
            .replaceAll('&','\u001b[38;5;57m@\x1b[0m')
            .replaceAll('!','\u001b[38;5;191m@\x1b[0m')
            
            .replace(`by KlyntarTeam`,`\u001b[38;5;9mby KlyntarTeam\x1b[0m`)
            .replace(`https://github.com/KLYN74R/Apollo`,`\u001b[38;5;23mhttps://github.com/KLYN74R/Apollo\x1b[0m`)




global.CONFIG=JSON.parse(fs.readFileSync(PATH_RESOLVE('./config.json')))




program
    .name('apollo')
    .version(fs.readFileSync(PATH_RESOLVE('images/version.txt')).toString('utf-8').replaceAll('QWERTY','Apollo@v2.0.0 by KlyntarTeam'))
    .description(banner)
    .usage('[COMMAND] [FLAGS]')

program

        .command('keygen')
        .alias('k')
        .option('-t, --type <value>','Crypto project name','klyntar')

        .description(`Generate new keypair`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


        
program

        .command('listkeys')
        .alias('l')
        .description(`List all supported key foramts by ValarDohaeris`)
        .action(async(name,_cmd)=>
        
            console.log(SUPPORTED_FORMATS)
            
        )



                
program

        .command('listspec')
        .alias('ls')
        .option('-t, --type <value>','Crypto project name','klyntar')
        .description(`List specific functions of some crypto(e.g. address format changes,set mnemo size etc.)`)
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
        
        .description(`Sign the message or content(by path)`)
        
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

        .description(`Verify signed message or content(by path)`)
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

        .description(`Encrypts private keys via AES-256 symmetric algorithm to paste ciphertext to configs or for secured storage`)
        
        .action(async(opts,_cmd)=>{

            
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
        .requiredOption('-e, --encprv <value>','Encrypted private key')
        .requiredOption('-p, --password <value>','password for AES decryption')

        .description(`Decrypts private keys via AES-256 symmetric algorithm. Be careful and avoid 3rd party eyes around you!`)
        
        .action(async(opts,_cmd)=>{

               
            //_____________________________________________Prepare key and initialization vector_____________________________________________
            
            
            let password_hash = crypto.createHash('sha256').update(opts.password,'utf-8').digest('hex'),
            
                IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
            
                password_hash=password_hash.slice(0,32)//We need first 16 bytes
                       
            
            //________________________________________________________Decrypt values_________________________________________________________
            
            try{
            
                let decipher = crypto.createDecipheriv('aes-256-cbc',password_hash,IV)
            
                console.log(decipher.update(opts.encprv,'hex','utf8')+decipher.final('utf8'))

            }catch{ console.log('Failed') }

        
        })


program

        .command('ui')
        .option('-p, --port <value>','Port to run web UI',9999)
        .option('-i, --interface <value>','interface to run server','::')
        .addHelpText('before',`
        
        ********************************************************
        * You can also use configs to set flags & other values *
        ********************************************************
        
        `)
        .description(`Run web UI for more comfortable use`)
        .action(async(opts,_cmd)=>{

            console.log(opts)
            // import('uWebSockets.js').then(module=>{

            //     let UWS=module.default
                
            //     UWS.App()
                
            //         .get('/',(a,q)=>{
                    
            //             a.end(`Hello from KLYNTAR@UI`)
                    
            //         }).listen(opts.port,opts.interface,ok=>console.log(`UI is available on [${opts.interface}]:${opts.port}`))

            
            // }).catch(e=>false)
        
        })
        



program

        .command('vanity')

        .requiredOption('-p, --prefix <value>','prefix for vanity address.Note:it`s only for Klyntar format(and Solana)')
        .option('-v, --verbose','track generation process')
        
        .description(`Generate your vanity Klyntar address with choosen prefix`)
        
        .action(async(opts,_cmd)=>{


            if(['0','O','I','l','+','/'].some(x=>opts.prefix.includes(x))){
 
                console.log('Be careful!. Klyntar addresses are Base58 so no symbols 0,O,I,l,+,/ in prefix are possible')
 
                process.exit()
            }

            console.log(`\u001b[38;5;168m`)
            
            let banner=fs.readFileSync(PATH_RESOLVE('images/vanity.txt')).toString('utf-8')
            
            console.log(banner)

            console.log(`\n\n\x1b[32mKlyntar started with maximum number of threads for your machine(\x1b[36m${process.env.NUMBER_OF_PROCESSORS}\x1b[32m)\x1b[0m`)


            for(let i=0;i<os.cpus().length;i++){

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



program.parse(process.argv)