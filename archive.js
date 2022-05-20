/*


============================= REQUIRED =============================

this.desc=desc,             //Describe your service in a few words.Minimum network size is 200 symbols
        
this.toolchain=toolchain,   //['docker','node.js'] - define toolchain and everything what your service are required
    
this.type=type,             //'self/git',
        
this.keywords=keywords,     //array of keywords for better recognition

this.payload=payload        //hex of service or link to repository/arhive to load service


============================= OPTIONAL =============================

this.symbiotes?             //array of symbiotes if service rely on them

this.hostchains?            //hostchains to interact with

this.dec_storage?           //does this service hosted somewhere in decentralized space


*/

import {hash} from 'blake3-wasm'

import AdmZip from "adm-zip"

let BLAKE3=v=>hash(v).toString('hex')

console.log(BLAKE3('VLAD'))
//Creating archives
// var zip = new AdmZip();

// // add local file
// zip.addLocalFile("antivenom.json");
// zip.addLocalFolder('TEST_SERVICE','TEST_SERVICE');


// // get everything as a buffer
// var willSendthis = zip.toBuffer();

// console.log(willSendthis)
// console.log(BLAKE3(willSendthis))

// zip.writeZip(/*target file name*/ "arch.zip");