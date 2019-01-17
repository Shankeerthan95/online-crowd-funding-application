import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminDashboardService} from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    title = 'Sign up';
    message: string;

    postForm = this.fb.group({
        post : this.fb.group({
            title: ['', Validators.required],
            user_id: ['', Validators.required],
            by: ['', Validators.required],
            image_urls: ['', Validators.required],
            video_urls: ['', Validators.required],
            story: ['', Validators.required],
            description: ['', Validators.required],
            donatation_button: ['', Validators.required],

            campaign_period: this.fb.group({
                start: ['', Validators.required],
                end : ['', Validators.required]

            }),
            campaign_location: this.fb.group({
                country: ['', Validators.required],
                places: ['', Validators.required]

            }),
            target_amount: this.fb.group({
                currency: ['', Validators.required],
                amount: ['', Validators.required]
            })


        })
    });

  constructor(private fb: FormBuilder , public router: Router ,private postNew: AdminDashboardService) { }

    onSubmit() {
        this.message = 'Trying to Sign Up ...';
        // console.log(this.signUpForm.value);
        this.postNew.postNew(this.postForm.value)
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

  ngOnInit() {
  }

}
