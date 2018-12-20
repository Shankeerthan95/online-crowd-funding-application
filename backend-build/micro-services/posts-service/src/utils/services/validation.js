
const validatePost = (post) => {

    if (!post.user_id ) {
        return false;
    }
    if (!post.title) {
        return false;
    }

    if (!post.image_urls) {
        return false;
    }

    if (!post.story) {
        return false;
    } 
    if (!post.target_amount) {
        return false;
    }

    if (!post.campaign_period) {
        return false;
    }

    if (!post.description) {
        return false;
    }

    if (!post.campaign_location) 
    {
        return false;
    } 
    
    if (!post.donatation_button) {
        return false;
    }

    return true;
}



module.exports = {
    validatePost
}