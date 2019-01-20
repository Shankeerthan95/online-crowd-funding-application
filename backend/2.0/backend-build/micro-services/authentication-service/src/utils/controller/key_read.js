const fs = require('fs');
const path = require('path');

// require('./private.key\')

let privateKey = () => {
    return fs.readFileSync(path.resolve(__dirname,'./private.key'));
    // return fs.readFileSync('../../private.key')
    // return "-----BEGIN RSA PRIVATE KEY-----\n"+
    // "MIICXAIBAAKBgQC1RG6yEP6OpDiVcmbL91Ezhv2QDf+7wJ5aOAodk2WLPF9A/Lhx"+
    // "K5CFHmz+EhDrmICJKZIcNefgVGyDI1EkN+/HxH3w+2Fa5QUzAqoLd+HlcwgVgEi2"+
    // "CyJO5LwgSC1NHQGzbQt1YAG8vGEDDT5zNkiMcudCTMtGVD9PVz8Rg7HL1QIDAQAB"+
    // "AoGALS48ZRfFSyp1jBJyut4PGEfKRbCnkFWnYpdbNhn6EmVe3KThGBwirntx8TXx"+
    // "j7d4OjfpWiy5efmw/lK8M8nZcsbXpAxD9KTsJbK/njr7Ymservxda2a3oTh85mUy"+
    // "dDzfON81Fn4/kNWRtVe4az2Pi7Hk7Ldmyh7DYgi1oPd2kEECQQDlSklYV4HMKPWF"+
    // "RS+eu/kz/cW1BaM/3njPvEgn3VNnI4B80vh6drgCwQIk7qVscl6PZd9kZ3ToFvXV"+
    // "qYCMcj1xAkEAymILl/FWsYHx3+sGp4V3y925O8ucQ/ggXWbLajEkXTh9F0aM3GvM"+
    // "fgg1CoLxGPObZZaAodfIHtMhEgF844JSpQJBALGzA+rSTsbSC43Qk9paZgUULPBh"+
    // "QSbTnR+qFOXIUsYBLqgOvQH0FiIUQTwsM8o7TOunkRz4TRM+ECIZ7oVqWBECQBwK"+
    // "8+JM7Z9RCyvkzBpAUzYrdfREJVYBtrJagQso3goQvryP6QrN4RsBlh/rvu6fKsQr"+
    // "040ZckBbLvTowd5ge4UCQE4rfkceL7DNh2RkDyVzN0fOrrEOzoAWF2SZP+fRJAMQ"+
    // "yxuy5CCWo33waKa8fQDTKLdjy/QAc5evKb3XvRwC7yQ="+
    // "-----END RSA PRIVATE KEY-----"
    
}

let publickey = () => { 
     return fs.readFileSync(path.resolve(__dirname , './public.key'));
    // return fs.readFileSync('../../public.key');
    // return "-----BEGIN PUBLIC KEY-----"+
    // "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1RG6yEP6OpDiVcmbL91Ezhv2Q"+
    // "Df+7wJ5aOAodk2WLPF9A/LhxK5CFHmz+EhDrmICJKZIcNefgVGyDI1EkN+/HxH3w"+
    // "+2Fa5QUzAqoLd+HlcwgVgEi2CyJO5LwgSC1NHQGzbQt1YAG8vGEDDT5zNkiMcudC"+
    // "TMtGVD9PVz8Rg7HL1QIDAQAB"+
    // "-----END PUBLIC KEY-----"
}


module.exports = {
    privateKey,
    publickey
};
