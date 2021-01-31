const validator = require('validator');
const passwordValidator = require('password-validator');


const PasswordSchema = new passwordValidator();
PasswordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces();







/**
 * Validate user object
 * 
 * @param user
 * @return Boolean
 */
let validateUser = (user) => {
    if (!user.user_name)
    {
        return false;
    }

    if (!user.email && !validator.isEmail(user.email))
    {
        return false;
    }

    if (!user.password && !PasswordSchema.validate(user.password))
    {
        return false;
    }

    if (!user.mobile_num && !validator.isMobilePhone(user.mobile_num))
    {
        return false;
    }

    if ((user.person === undefined && user.organization === undefined) )
    {
        return false;
    }

    if (user.person) 
    {
        if (!user.person.firstName) {
            return false;
        }
        if (!user.person.lastName) {
            return false;
        }
    }

    if (user.organization) {
        if (!user.organization.name ) {
            return false;
        }
        if (user.organization.isNonProfit === undefined) {
            return false;
        }
        if (!user.organization.noOfMembers) {
            return false;
        }
        if (user.organization.hasOffice === undefined) {
            return false;
        }
        if (!user.organization.description) {
            return false;
        }
    }





    if (!user.country) return false;

    if (!user.address) {
        return false;
    } 



    return true;
};







module.exports = {
    validateUser: validateUser
};