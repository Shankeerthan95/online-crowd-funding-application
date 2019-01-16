import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json;charset=utf-8',
        // 'Content-Type':  'application/json'
        // 'Cache-Control': 'no-cache',
        'Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
        // 'Proxy-Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l'
        // 'WWW-Authenticate' : 'Basic realm =  Our Site'
        // 'WWW-Authenticate: Basic realm' : ' User Visible Realm ' // , charset="UTF-8'
        // 'Authorization': 'my-auth-token'
    })
};

const  options = {
    headers: httpOptions
};

@Injectable({
  providedIn: 'root'
})



export class LoginService {


  // url = 'http://localhost:8080/api/v1/auth/login';
    url = '/api/v1/auth/login';

    constructor( private http: HttpClient) { }

  // loginUser(loginForm) {
  //     return this.http.post(this.url, loginForm, httpOptions);
  //
  // }


    // post<T>(url: string, body: any | null, options?: {
    //     headers?: HttpHeaders | {
    //         [header: string]: string | string[];
    //     };
    //     observe?: 'body';
    //     params?: HttpParams | {
    //         [param: string]: string | string[];
    //     };
    //     reportProgress?: boolean;
    //     responseType?: 'json';
    //     withCredentials?: boolean;
    // }): Observable<T>;


    /** POST: add a new hero to the database */
    loginUser (hero: any): Observable<any> {
       console.log(hero);

        // return this.http.post<any>(this.url, hero,
        //     {
        //         headers: httpOptions,
        //         /*observe: 'response'*/
        //     }
        // ) .pipe(
        //     catchError(this.handleError)
        // );




        return this.http.post<any>(this.url, hero, httpOptions , )
            .pipe(
                catchError(this.handleError)
            );
    }





    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }


}
