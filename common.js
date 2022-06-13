export default {

    encrypt:async(password,privateKey)=>{

        
        let crypto=await import('crypto')
            
        //_____________________________________________Prepare key and initialization vector_____________________________________________
        
        
        let password_hash = crypto.createHash('sha256').update(password,'utf-8').digest('hex'),
        
            IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
        
            password_hash=password_hash.slice(0,32)//We need first 16 bytes
        
        
        //_______________________________________________________Start encryption________________________________________________________
        
        
        let cipher = crypto.createCipheriv('aes-256-cbc',password_hash,IV),

            result=cipher.update(privateKey,'utf8','hex') + cipher.final('hex')
        

        return result


    },
    
    decrypt:async(password,cipherTextPrivateKey)=>{

        let crypto=await import('crypto')
               
        //_____________________________________________Prepare key and initialization vector_____________________________________________
        
        
        let password_hash = crypto.createHash('sha256').update(password,'utf-8').digest('hex'),
        
            IV=Buffer.from(password_hash.slice(32),'hex')//Get second 16 bytes of SHA256 hash
        
            password_hash=password_hash.slice(0,32)//We need first 16 bytes
                   
        
        //________________________________________________________Decrypt values_________________________________________________________
        
        try{
        
            let decipher = crypto.createDecipheriv('aes-256-cbc',password_hash,IV)
        
            return decipher.update(cipherTextPrivateKey,'hex','utf8')+decipher.final('utf8')

        }catch{ return '\x1b[31;1mFailed\x1b[0m' }


    }

}