import {hash} from 'blake3-wasm'

import AdmZip from "adm-zip"

let BLAKE3=v=>hash(v).toString('hex')

//Creating archives
var zip = new AdmZip();

// add local file
zip.addLocalFile("antivenom.json");
zip.addLocalFolder('TEST_SERVICE','TEST_SERVICE');


// get everything as a buffer
var willSendthis = zip.toBuffer();

console.log(willSendthis)
console.log(BLAKE3(willSendthis))

zip.writeZip(/*target file name*/ "arch.zip");