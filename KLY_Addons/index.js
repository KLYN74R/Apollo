//Fix to load addons. For node v17.9.0 it's still impossible to load addons to ESM environment
//See https://stackoverflow.com/a/66527729/18521368
let { createRequire } = await import('module'),

    require = createRequire(import.meta.url),

    //the main module-contains all builded addons
    ADDONS = require('./build/Release/BUNDLE'),

    //and blake3 to get hash of public keys
    {hash}=await import('blake3-wasm'),

    BLAKE3=v=>hash(v).toString('hex')




export default {

    list:()=>{

        let desc=`

        ______________________________________________GENERATE KEYPAIRS_____________________________________________

        gen_DIL - generate Dilithium PQC keypair.BLAKE3 hash of pubkey is address. Result => {private,public,address}
        gen_BLISS - generate BLISS PQC keypair.BLAKE3 hash of pubkey is address. Result => {private,public,address}

        ________________________________________________SIGN / VERIFY_______________________________________________

        Dilithium

            + sign_DIL(privateKey,message)
            + verify_DIL(message,pubKey,signa)

        Bliss

            + sign_BLISS(privateKey,message)
            + verify_BLISS(message,pubKey,signa)

        ________________________________________________KEY EXCHANGE_______________________________________________

        *Coming soon(will be added with services)


        ____________________________________________________USAGE__________________________________________________

        apollo pqc -f gen_DIL (no params needed)
        apollo pqc -f sign_DIL -p <previously generated PRIVATE key>,SIGN-ME-MESSAGE
        apollo pqc -f verify_DIL -p SIGN-ME-MESSAGE,<previously generated PUBLIC key>,<previously generated signa>

        `

        console.log(desc)

    },

    action:(funcName,paramsArr)=>{

        let params=paramsArr?.split(',')

        if(['gen_DIL','gen_BLISS'].includes(funcName)){

            let [pubKey,privateKey]=ADDONS[funcName]().split(':')

            console.log({pubKey,privateKey,address:BLAKE3(pubKey)})

        }else console.log(ADDONS[funcName]?.(...(params||[])))

    }

}


// {

//     gen_CSIDH: [Function: gen_CSIDH],
//     get_CSIDH: [Function: get_CSIDH],
//     gen_KYBER: [Function: gen_KYBER],
//     gen_KYBER_SharedSender: [Function: gen_KYBER_SharedSender],
//     gen_KYBER_SharedRecepient: [Function: gen_KYBER_SharedRecepient],
//     sha256: [Function: sha256],
//     gen_SIKE: [Function: gen_SIKE],
//     enc_SIKE: [Function: enc_SIKE],
//     dec_SIKE: [Function: dec_SIKE],
//     gen_SIDH: [Function: gen_SIDH],
//     get_SIDH: [Function: get_SIDH]