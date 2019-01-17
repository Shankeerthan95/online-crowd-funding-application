import { Component } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { AuthService } from '../auth.service';

import { FormGroup, FormControl } from '@angular/forms';

import {LoginService} from './login.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public  message: string;

    public router: Router;

    constructor(public authService: AuthService, router: Router , private loginService: LoginService ) {
        this.router = router;
        this.setMessage();
    }

    loginForm = new FormGroup({
        email : new FormControl(''),
        password : new FormControl(''),

    });

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login(this.loginForm.value)
            .subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                const navigationExtras: NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };

                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            }
        },
                () => {
                    this.message = 'Wrong user name or password... Try again';
                    console.log('error');
                }
        );
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }

    onSubmit() {
        // console.log(this.loginForm.value);
        this.loginService.loginUser(this.loginForm.value)
            .subscribe(
                () => {
                    this.router.navigate(['/home']);
                },
                () => {
                    this.message = 'Something went wrong... Please try again';
                    console.log('error');
                }
            );
    }

}

