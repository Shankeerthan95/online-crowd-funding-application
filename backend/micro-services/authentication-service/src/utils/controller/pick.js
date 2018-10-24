const _ = require('lodash');


let pickUser  = (user) => {
    return _.pick(user, ['user_name', 'email', 'mobile_num', 'country', 'person', 'address', 'organization', 'social_medias'])
}



module.exports = {
    pickUser
}