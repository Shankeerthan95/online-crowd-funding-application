export interface Home {
    target_amount: {
        currency: string;
        amount: number;
    };
    campaign_location: {
        country: string[];
        places: string[];
    };
    places: string[];
    image_urls: string[];
    _id: string;
    title: string;
    description: string;

}
