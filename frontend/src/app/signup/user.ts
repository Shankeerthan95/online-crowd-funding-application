import {Person} from './person';
import {Address} from './address';

export class User {

    // constructor(
        public user_name: string;
        public mobile_num: number;
        public email: string;
        public password: string;
        public person: Person;
        public country: string;
        public address: Address;


    // ) {}

}

// {
//     "user": {
//         "user_name": "john";
//         "mobile_num": "0404044";
//         "email": "john@gmail.com";
//         "password": "john";
//         "person" : {
//             "firstName": "sfs";
//             "lastName": "hfsfs"
//         };
//
//         "country": "Srilanka" ;
//         "address": {
//             "street": "fsfs";
//             "cityOrTown": "hsfsf" ;
//             "district": "hfsfs" ;
//             "stateOrProvince": "hsfsf";
//             "country": "hsfsf";
//             "postalCode": "400440"
//         }
//
//     }
// }

