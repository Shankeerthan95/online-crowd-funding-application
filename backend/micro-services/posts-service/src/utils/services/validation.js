
const validatePost = (post) => {
    if (post.title == undefined) {
        return false;
    }

    if (post.image_urls == undefined) {
        return false;
    }

    if (post.story == undefined) {
        return false;
    } 
    if (post.target_amount == undefined) {
        return false;
    }

    if (post.campaign_period == undefined) {
        return false;
    }

    if (!post.description) {
        return false;
    }

    if (!post.campaign_location) 
    {
        return false;
    }

    return true;
}



module.exports = {
    validatePost
}