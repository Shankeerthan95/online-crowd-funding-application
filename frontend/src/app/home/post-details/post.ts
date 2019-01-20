export class Post {
    target_amount: {
        currency: string;
        amount: number;
    };
    campaign_location: {
        country: string[];
        places: string[];
    };
    campaign_period:{
        start: string;
        end: string;
    };
    places: string[];
    image_urls: string[];
    _id: string;
    title: string;
    description: string;
    end: boolean;
    user_id: string;
    by: string;
    story: string;
    donatation_button: string;
    comments: string[];
    timestamp:string;


}
