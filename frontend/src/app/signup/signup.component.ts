import { Component, OnInit } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

    title = 'frontend';
  userModel = new User();

  ngOnInit() {
  }

    onSubmit() {
        console.log(this.userModel);
    }

}
