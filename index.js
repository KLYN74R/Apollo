#!/usr/bin/env node
import {SUPPORTED_FORMATS} from '@klyntar/valardohaeris/vd.js'
import {program} from 'commander'

import pkg from 'inquirer'
const { prompt } = pkg

import fs from 'fs'




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

    .version('v2.0.0')
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