import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Post} from './post';
import {catchError} from 'rxjs/operators';
import {HomeService} from '../home.service';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService extends HomeService {

  getPostDetails(id: string): Observable<HttpResponse<Post>> {
      const postUrl = 'api/v1/post/posts/'.concat(id);
      return this.http.get<Post>(
          postUrl, { observe: 'response' }).pipe(
          catchError(this.handleError)
      );
  }


}
