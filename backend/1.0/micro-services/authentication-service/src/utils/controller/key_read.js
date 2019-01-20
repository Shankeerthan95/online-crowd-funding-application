const fs = require('fs');
const path = require('path');



let privateKey = () => {
    return fs.readFileSync(path.resolve(__dirname,'../../../../../keys/private.key'));
}

let publickey = () => { 
    return fs.readFileSync(path.resolve(__dirname , '../../../../../keys/public.key'));
}


module.exports = {
    privateKey,
    publickey
};
