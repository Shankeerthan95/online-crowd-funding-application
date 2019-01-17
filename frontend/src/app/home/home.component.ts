import {Component, OnInit} from '@angular/core';
import {HomeService,PostResponses} from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private headers: string[];
    postResponses: PostResponses[];

    constructor(private homeService: HomeService) {
    }

    // http://localhost:8000/api/v1/post/posts?page=0&limit=2

    showConfigResponse() {
        this.homeService.getConfigResponse()
        // resp is of type `HttpResponse<Config>`
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);

                // access the body directly, which is typed as `Config`.
                this.postResponses = { ... resp.body };
                // console.log(this.postResponse[0].title);
                console.log(this.postResponses);

                // console.log(this.headers);
            });
    }

    ngOnInit() {
        this.showConfigResponse();
    }

}
