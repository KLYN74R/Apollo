/*


More info at https://github.com/tj/commander.js


*/


PROGRAM //globalvar

.command('uno-stats')
.alias('us')

.description(`Get the propositions to stake your Unobtanium`)

// Тут передаем флаги
.option('-a, --addresses <value>','TICKER:ADRR in CSV format.Example btc:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa,polygon:0xe6E9a384AD6D138eBAA7006F0Be3BD46f873c027')
.option('-u, --url <value>','API server to get info')

.action(async(opts,_cmd)=>{

    // Тут уже парсите команды, параметры и выполняете нужную логику  
    
})