import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {SignupService} from './signup.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {




    constructor(private fb: FormBuilder , private signupService: SignupService, public router: Router ) {
  }

    title = 'Sign up';
    message: string;

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
        this.message = 'Trying to Sign Up ...';
        // console.log(this.signUpForm.value);
        this.signupService.signUpUser(this.signUpForm.value)
            .subscribe(
                () => {
                    this.router.navigate(['/home']);
                },
                () => {
                    // this.message = this.signupService.getErrorMessage();
                    // console.log(this.signupService.errorMessage);
                   // this.signupService.currentMessage.subscribe(message => this.message = message)
                    console.log('error');

                }
            );
    }

}
