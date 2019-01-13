import {Component, OnInit} from '@angular/core';
// import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginService} from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


// example
// export class ProfileEditorComponent {
//     profileForm = new FormGroup({
//         firstName: new FormControl(''),
//         lastName: new FormControl(''),
//     });
// }


export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService) {}
    title = 'Login';

    loginForm = new FormGroup({
        email : new FormControl(''),
        password : new FormControl(''),

    });




    ngOnInit() {
    }

    onSubmit() {
        console.log(this.loginForm.value);
        this.loginService.loginUser(this.loginForm.value)
            .subscribe(
                response => console.log('Sucess'),
                error1 => console.log('error')
            );
    }

}
