#!/usr/bin/env node
import chalk from 'chalk'
import fs from 'fs'

import {program} from 'commander'

import pkg from 'inquirer';
const { prompt } = pkg;


global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

let PATH_RESOLVE=path=>__dirname+'/'+path





let banner=fs.readFileSync(PATH_RESOLVE('banner.txt')).toString('utf-8')
.replaceAll('█','\x1b[32;1m█\x1b[0m')
.replaceAll('#','\x1b[36;1m#\x1b[0m')
.replace(`< import VD from '@klyntar/valardohaeris/<CRYPTO>/vd.js' >`,`\x1b[31;1m< import VD from '@klyntar/valardohaeris/<CRYPTO>/vd.js' >\x1b[0m`)
.replace('<CRYPTO>','\x1b[33;1m<CRYPTO>\x1b[0m')
.replace(`/vd.js' >`,`\x1b[31;1m/vd.js' >\x1b[0m`)
.replace(`directories of package`,`\u001b[38;5;3mdirectories of package\x1b[0m`)
.replace(`https://github.com/KLYN74R/ValarDohaeris`,`\u001b[38;5;3mhttps://github.com/KLYN74R/ValarDohaeris\x1b[0m`)


program.version('v1.0.0').description(banner)

program
  .command('create <name>')
  .option('--extension <value>', 'File extension')
  .alias('c')
  .description('Create new configuration file.')
  .action((name, cmd) => {
    if (
      cmd.extension &&
      !['json', 'txt', 'cfg'].includes(cmd.extension)
    ) {
      console.log(chalk.red('\nExtension is not allowed.'))
    } else {
      prompt([
        {
          type: 'input',
          name: 'charset',
          message: 'Charset: ',
        },
        {
          type: 'input',
          name: 'max_ram_usage',
          message: 'Max RAM usage, Mb: ',
        },
        {
          type: 'input',
          name: 'max_cpu_usage',
          message: 'Max CPU usage, %: ',
        },
        {
          type: 'input',
          name: 'check_updates_interval',
          message: 'Updates interval, ms: ',
        },
        {
          type: 'input',
          name: 'processes_count',
          message: 'Processes count: ',
        },
      ]).then((options) => {
        if (cmd.extension && cmd.extension === 'json') {
          fs.writeFileSync(
            `files/${name}.${cmd.extension}`,
            JSON.stringify(options)
          )
        } else {
          let data = ''
          for (let item in options)
            data += `${item}=${options[item]} \n`

          fs.writeFileSync(`files/${name}.cfg`, data)
        }
        console.log(
          chalk.green(
            `\nFile "${name}.${
              cmd.extension || 'cfg'
            }" created.`
          )
        )
      })
    }
  })

program
  .command('all')
  .alias('a')
  .description('Show all configuration files.')
  .action(() => {
    const files = fs.readdirSync('files')

    let data = ''
    for (let file of files) data += `${file} \n`

    console.log(
      chalk.grey(`\nConfiguration files: \n\n${data}`)
    )
  })

program.parse(process.argv)