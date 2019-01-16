import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {tap, delay, catchError} from 'rxjs/operators';
import {LoginService} from './login/login.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends LoginService{
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    // login(): Observable<boolean> {
    //     return of(true).pipe(
    //         delay(1000),
    //         tap(val => this.isLoggedIn = true)
    //     );
    // }

    login(hero: any): Observable<boolean> {
        return this.http.post<any>(this.url, hero, this.httpOptions)
            .pipe(
                tap(val => this.isLoggedIn = true),
                catchError(this.handleError)
            );
    }

    // onSubmit() {
    //     // console.log(this.loginForm.value);
    //     this.loginService.loginUser(this.loginForm.value)
    //         .subscribe(
    //             response => console.log('Sucess'),
    //             error1 => console.log('error')
    //         );
    // }


    logout(): void {
        this.isLoggedIn = false;
    }
}
