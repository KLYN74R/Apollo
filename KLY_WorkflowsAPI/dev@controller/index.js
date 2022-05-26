import VD from '@klyntar/valardohaeris/klyntar/vd.js'
import fetch from 'node-fetch'




//BTW such API's specific for some workflows,services and so on may ask for some specific env options,data in configuration file and so on. It's so flexible and cool



export default {
 
    TX:async cmdPayload=>{

        if (cmdPayload==='usage'){

            console.log('\napollo events PATH_TO_YOURKEYPAIR,recepient,amount,symbiote_alias')
            console.log('********** Example:~/.my/secretkeypair.json,RqtrnrLAdxpUkjqKS42RKbgN1ryXad3NeJrPTBZpdyVL,20.22,kNULL **********')
            console.log('\n\n In this case ~/.my/secretkeypair.json is absolute path, RqtrnrLAdxpUkjqKS42RKbgN1ryXad3NeJrPTBZpdyVL - address you want to send data, 20.22 - amount of KLY, kNULL - alias of your destination symbiote')

        }else{

            let fs = await import('fs'),

                [path,recepient,amount,alias] = cmdPayload.split(','),
            
                symbiote=CONFIG.ALIASES[alias],

                {publicKey,privateKey}=JSON.parse(fs.readFileSync(path))

                
            let nonce=await fetch(`${CONFIG.CLUSTER}/account/${symbiote}/${pub}`).then(r=>r.json()).then(d=>d.N+1)
            
            console.log('NONCE is ',nonce)

            /*
            
            let event={
   c:pub,
   t:'TX',
   n:NONCE,
   p:{
       r:'RqtrnrLAdxpUkjqKS42RKbgN1ryXad3NeJrPTBZpdyVL',
       a:60.7878
   }
}

event.s=await SIG(JSON.stringify(event.p)+symbiote+NONCE+'TX',prv)
console.log(event)
console.log(await VERIFY(JSON.stringify(event.p)+symbiote+NONCE+'TX',event.s,event.c))

fetch('http://localhost:11111/event',{method:'POST',body:JSON.stringify({symbiote,event})}).then(d=>d.text()).then(console.log)



            
            */

        }


    },



    //payload is a single string(hash)
    NEWSTX:async(symbiote,event)=>
    
        typeof event.p==='string' && event.p.length===64
        &&
        await VERIFY(JSON.stringify(event.p)+symbiote+event.n+event.t,event.s,event.c) ? {c:event.c,t:event.t,n:event.n,p:event.p,s:event.s} : false
        
    ,


    OFFSPRING:async(symbiote,event)=>
    
        typeof event.p==='string'
        && 
        await VERIFY(JSON.stringify(event.p)+symbiote+event.n+event.t,event.s,event.c) ? {c:event.c,t:event.t,n:event.n,p:event.p,s:event.s} : false
        
    ,

    DELEGATION:async(symbiote,event)=>
    
        typeof event.p==='string'
        &&
        await VERIFY(JSON.stringify(event.p)+symbiote+event.n+event.t,event.s,event.c) ? {c:event.c,t:event.t,n:event.n,p:event.p,s:event.s} : false
        
    ,

    ALIAS:async (symbiote,event)=>{},

    UNOBTANIUM:async (symbiote,event)=>{},
    
    //Unimplemented
    RL_OWNSHIP_APPRV:async (symbiote,event)=>{},

    QUANTUMSWAP:async (symbiote,event)=>{},

    SERVICE_DEPLOY:async(symbiote,event)=>{},

    WORKFLOW_CHANGE:async (symbiote,event)=>{},

    MULTISIG:async (symbiote,event)=>{},

    THRESHOLD:async (symbiote,event)=>{},

    SERVICE_COMMIT:async (symbiote,event)=>{},

    PQC_TX:async (symbiote,event)=>{},

    
}


