/*


More info at https://github.com/tj/commander.js


*/


PROGRAM

.command('testmodule')
.alias('l')
.description(`\x1b[32mTest extensions\x1b[0m`)

.action(async()=>

    console.log('HELLO')
    
)