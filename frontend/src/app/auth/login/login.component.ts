import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { FormGroup, FormControl } from '@angular/forms';

import {LoginService} from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;

    constructor(public authService: AuthService, public router: Router , private loginService: LoginService) {
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

        this.authService.login(this.loginForm.value).subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }

    onSubmit() {
        // console.log(this.loginForm.value);
        this.loginService.loginUser(this.loginForm.value)
            .subscribe(
                response => console.log('Sucess'),
                error1 => console.log('error')
            );
    }

}

