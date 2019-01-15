import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {SignupService} from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder , private signupService: SignupService) { }

    title = 'frontend';

       signUpForm = this.fb.group({
       user : this.fb.group({
            user_name: [''],
            mobile_num: [''],
            email: [''],
            password: [''],

            person : this.fb.group({
                firstName: [''],
                lastName : [''],

            }),

           country: [''],

           address : this.fb.group({
               street: [''],
               cityOrTown: [''],
               district: [''],
               stateOrProvince: [''],
               country: [''],
               postalCode: ['']
           })

        })


    });

  ngOnInit() {
  }

    onSubmit() {
        // console.log(this.signUpForm.value);
        this.signupService.signUpUser(this.signUpForm.value)
            .subscribe(
                response => console.log('Success'),
                error1 => console.log('error')
            );
    }

}
