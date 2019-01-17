import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private fb: FormBuilder) { }



    // "cars":[ "Ford", "BMW", "Fiat" ]

  /*

  {
        "post": {
            "title": ,
            "user_id",
            "by": ,
            "image_urls":[],
            "video_urls": [] ,
            "story": ,
            "target_amount": {
                "currency": ,
                "amount":
            },
            "campaign_amount": {
                "start": ,
                "end":
            },
            "description": ,
            "campaign_location": {
                "country": ,
                "places": []
            }
        }
    }


   */


  ngOnInit() {
  }

}
