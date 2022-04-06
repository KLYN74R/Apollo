#!/usr/bin/env node

import {SUPPORTED_FORMATS} from '@klyntar/valardohaeris/vd.js'
import {program} from 'commander'
import readline from'readline'
import crypto from'crypto'
import pkg from 'inquirer'
import fs from 'fs'


const { prompt } = pkg


global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

let PATH_RESOLVE=path=>__dirname+'/'+path



let banner=fs.readFileSync(PATH_RESOLVE('banner.txt')).toString('utf-8')
            .replaceAll('█','\u001b[38;5;50m█\x1b[0m')
            .replaceAll('*','\u001b[38;5;50m*\x1b[0m')
            .replaceAll('Q','\u001b[38;5;196mK\x1b[0m')
            .replaceAll('W','\u001b[38;5;196mL\x1b[0m')
            .replaceAll('E','\u001b[38;5;196mY\x1b[0m')
            .replace(`by KlyntarTeam`,`\u001b[38;5;9mby KlyntarTeam\x1b[0m`)
            .replace(`https://github.com/KLYN74R/Apollo`,`\u001b[38;5;23mhttps://github.com/KLYN74R/Apollo\x1b[0m`)



program

    .version('Apollo@v2.0.0 by KlyntarTeam')
    .description(banner)
    .usage('apollo [FLAGS] [COMMAND]')

program

        .command('keygen')
        .alias('k')
        .option('-t, --type <value>','Crypto project name','klyntar')

        .description(`Generate new keypair`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


        
program

        .command('list')
        .alias('l')
        .description(`List all supported key foramts by ValarDohaeris`)
        .action(async(name,_cmd)=>
        
            console.log(SUPPORTED_FORMATS)
            
        )



                
program

        .command('spec')
        .description(`Call specific functions of some crypto`)
        .action(async(name,_cmd)=>
        
            console.log(SUPPORTED_FORMATS)
            
        )



        
program

        .command('sign')
        .alias('s')
        .option('-p, --path <value>','Path to file')

        .description(`Sign the message or content(by path)`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


        


        
program

        .command('verify')
        .alias('v')
        .option('-p, --path <value>','Path to file')

        .description(`Verify signed message or content(by path)`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


program

        .command('encrypt')
        .alias('e')


        .description(`Encrypts private keys via AES-256 symmetric algorithm to paste ciphertext to configs or for secured storage`)
        
        .action(async(_opts,_cmd)=>{

            let rl = readline.createInterface({input: process.stdin,output: process.stdout})


            //_____________________________________________________Get data to encrypt_______________________________________________________

            
            let privatekey=await new Promise(resolve=>rl.question('\nEnter your privatekey to encrypt ---> \x1b[33m',resolve)),
                        
            //PATH_TO=await new Promise(resolve=>rl.question('\n\x1b[0mEnter your PATH_TO to encrypt --->\x1b[33m',resolve)),
            
            password = await new Promise(resolve=>rl.question('\n\x1b[0mFinally,enter your \x1b[32mpassword\x1b[0m to encrypt ---> \x1b[33m',resolve))
            
            console.log('\x1b[0m')
            
            //_____________________________________________Prepare key and initialization vector_____________________________________________
            
            
            let password_hash = crypto.createHash('sha256').update(password,'utf-8').digest('hex'),
            
            IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
            
            password_hash=password_hash.slice(0,32)//We need first 16 bytes
            
            
            //_______________________________________________________Start encryption________________________________________________________
            
            
            let cipher = crypto.createCipheriv('aes-256-cbc',password_hash,IV)
            
            //fs.writeFileSync(PATH_TO,cipher.update(fs.readFileSync(PATH_FROM,'utf-8'),'utf8','hex') + cipher.final('hex'))

            let banner=fs.readFileSync(PATH_RESOLVE('crypt.txt')).toString('utf-8')
            .replaceAll('@','\u001b[38;5;50m@\x1b[0m')
            .replaceAll('O','\u001b[38;5;160m*\x1b[0m')
            .replaceAll('o','\u001b[38;5;160m*\x1b[0m')

            .replace('QWERTY',`Encrypted  -> \x1b[32m${cipher.update(privatekey,'utf8','hex') + cipher.final('hex')}\x1b[0m`)
           
            console.log(banner)

            rl.close()

        
        })


program

        .command('decrypt')
        .alias('d')


        .description(`Decrypt private keys via AES-256 symmetric algorithm. Be careful!`)
        
        .action(async(_opts,_cmd)=>{

            let rl = readline.createInterface({input: process.stdin,output: process.stdout}),

                encryptedPrivateKey=await new Promise(resolve=>rl.question('\n\x1b[0mEnter encrypted privatekey ---> \x1b[33m',resolve)),

                password=await new Promise(resolve=>rl.question('\n\x1b[0mEnter password to decrypt ---> \x1b[33m',resolve))
    

            
            
            
            //Get 32 bytes SHA256(Password)
            password=crypto.createHash('sha256').update(password,'utf-8').digest('hex')
            
            let IV=Buffer.from(password.slice(32),'hex')//Get second 16 bytes
            
            console.log('\x1b[0m')
            
            password=password.slice(0,32)//Retrieve first 16 bytes from hash
            
            
            //________________________________________________________Decrypt values_________________________________________________________
            
            try{
            
                let decipher = crypto.createDecipheriv('aes-256-cbc',password,IV)
            
                let banner=fs.readFileSync(PATH_RESOLVE('crypt.txt')).toString('utf-8')
                    .replaceAll('@','\u001b[38;5;50m@\x1b[0m')
                    .replaceAll('O','\u001b[38;5;160m*\x1b[0m')
                    .replaceAll('o','\u001b[38;5;160m*\x1b[0m')
    
                    .replace('QWERTY',`Decrypted  -> \x1b[32m${decipher.update(encryptedPrivateKey,'hex','utf8')+decipher.final('utf8')}\x1b[0m`)
               
                console.log(banner)
    

            }catch{ console.log('Failed') }
            
            rl.close()

        
        })


program

        .command('ui')
        .option('-p, --port <value>','Port to run web UI',9999)
        .option('-i, --interface <value>','interface to run server','::')
        .addHelpText('before',`
        
        *****************
        *   dfsdfsdf    *
        *****************
        
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
        



program.parse(process.argv)