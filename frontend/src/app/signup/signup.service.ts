import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
    })
    // observe : 'response'
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {
    public errorMessage;
    private messageSource = new BehaviorSubject('test');
    currentMessage = this.messageSource.asObservable();

    url = '/api/v1/auth/signup';

    constructor( private http: HttpClient ) { }


    signUpUser (hero: any): Observable <any> {

        console.log(hero);
        // this.messageSource.next('test1');

        return this.http.post<any>(this.url, hero, httpOptions)
            .pipe(
                // tap(val => this.messageSource.next('test1')  ),
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        this.messageSource.next(error.error);



        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          //  this.errorMessage = error.error.message;
          //   this.messageSource.next('test1');


        } else {

            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body : ${error.error}`);
            this.errorMessage = error.error;
            // this.messageSource.next('text1');

            // this.messageSource.next(this.errorMessage);
             console.log(this.errorMessage);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
