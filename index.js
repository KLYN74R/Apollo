#!/usr/bin/env node
import {SUPPORTED_FORMATS} from '@klyntar/valardohaeris/vd.js'
import {program} from 'commander'
import chalk from 'chalk'
import fs from 'fs'

import pkg from 'inquirer';
const { prompt } = pkg;


global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

let PATH_RESOLVE=path=>__dirname+'/'+path



let banner=fs.readFileSync(PATH_RESOLVE('banner.txt')).toString('utf-8')
            .replaceAll('█','\u001b[38;5;50m█\x1b[0m')
            .replace(`by KlyntarTeam`,`\u001b[38;5;9mby KlyntarTeam\x1b[0m`)
            .replace(`https://github.com/KLYN74R/CommandPost`,`\u001b[38;5;23mhttps://github.com/KLYN74R/CommandPost\x1b[0m`)



program

    .version('v1.0.0')
    .description(banner)
    .usage('compose [FLAGS] [COMMAND]')


program

        .command('keygen')
        .alias('k')
        .option('-t, --type <value>','Crypto project name','klyntar')

        .description(`Generate new keypair`)
        .action(async(opts,_cmd)=>
        
            import(`@klyntar/valardohaeris/${opts.type}/vd.js`).then(m=>m.default.generate()).then(console.log).catch(e=>false)
            
        )


        
program

        .command('keylist')
        .alias('list')
        .description(`List all supported key foramts by ValarDohaeris`)
        .action(async(name,_cmd)=>
        
            console.log(SUPPORTED_FORMATS)
            
        )


program.parse(process.argv)