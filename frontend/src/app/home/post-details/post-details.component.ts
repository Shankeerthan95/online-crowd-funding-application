import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ID} from '../id';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {PostDetailsService} from './post-details.service';
import {Post} from './post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public id: string;
  public postDetails: Post;
    private headers: string[];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: PostDetailsService,
      private postDetailsService: PostDetailsService
  ) { }

  ngOnInit() {
      // this.id$ = this.route.paramMap.pipe(
      //     switchMap((params: ParamMap) =>
      //         this.service.getHero(params.get('id')))
      //         // console.log(params.get('id')))
      // );


      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      this.showConfigResponse();

      // this.hero$ = this.service.getHero(id);
  }

    showConfigResponse() {
        this.postDetailsService.getPostDetails(this.id)
        // resp is of type `HttpResponse<Config>`
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);

                // access the body directly, which is typed as `Config`.
                this.postDetails = { ... resp.body };


                // this.test = this.postResponses[0].title;
                // this.dummy = this.postResponses[0];

                // console.log(this.postResponses[0]);
                console.log(this.postDetails);

                // console.log(this.headers);
            });
    }

}
