import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type' : 'application/json',
    })
    // observe : 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {


    url = '/api/v1/post/new';

    constructor( private http: HttpClient ) { }


  public  postNew (hero: any): Observable <any> {

        console.log(hero);
        return this.http.post<any>(this.url, hero, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
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

        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
