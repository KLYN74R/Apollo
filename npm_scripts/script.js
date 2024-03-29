import fs from 'fs'

global.__dirname = await import('path').then(async mod=>
  
    mod.dirname(
      
      (await import('url')).fileURLToPath(import.meta.url)
      
    )

)

let banner=fs.readFileSync(__dirname+'/script.txt').toString('utf-8')
            
            .replaceAll('█','\u001b[38;5;50m█\x1b[0m')            
            .replaceAll('#','\x1b[36;1m#\x1b[0m')
            .replaceAll(')','\u001b[38;5;3m)\x1b[0m')
            .replaceAll('(','\u001b[38;5;57m(\x1b[0m')
            .replaceAll('|','\u001b[38;5;87m|\x1b[0m')
            .replaceAll('/','\u001b[38;5;160m/\x1b[0m')
            .replaceAll('\\','\u001b[38;5;160m\\\x1b[0m')

            .replaceAll('[STATUS]','\u001b[38;5;202m[STATUS]\x1b[0m')
            .replaceAll('by KlyntarTeam','\u001b[38;5;83mby KlyntarTeam\x1b[0m')
            .replaceAll('#','\x1b[31m#\x1b[36m')+'\x1b[0m\n'


console.log(banner)