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

    if (!user.email)
    {
        return false;
    }

    if (!user.password)
    {
        return false;
    }

    if (!user.mobile_num)
    {
        return false;
    }

    return true;
};







module.exports = {
    validateUser: validateUser
};