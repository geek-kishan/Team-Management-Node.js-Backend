const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const key = 'b2df428b9929d3ace7c598bbf4e496b2';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

module.exports = {
    encrypt: async (password)=>{
        try{
            const iv = await new Buffer.from(crypto.randomBytes(16));
            const cipher = await crypto.createCipheriv(algorithm, key, iv);
            let crypted = await cipher.update(password, inputEncoding, outputEncoding);
            crypted += await cipher.final(outputEncoding);
            return await `${iv.toString('hex')}:${crypted.toString()}`;
        }catch(err){
            console.log(err);
        }
    },

    decrypt: async (password)=>{
        try{
            const textParts = await password.split(':');
            const IV = await new Buffer.from(textParts.shift(), outputEncoding);
            const encryptedText = await new Buffer.from(textParts.join(':'), outputEncoding);
            const decipher = await crypto.createDecipheriv(algorithm,key, IV);
            let decrypted = await decipher.update(encryptedText,  outputEncoding, inputEncoding);
            decrypted += await decipher.final(inputEncoding);
            return await decrypted.toString();
        }catch(err){
            console.log(err);
        }
    }
}