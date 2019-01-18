import {Component, OnInit} from '@angular/core';
import {HomeService,PostResponses} from './home.service';
import {Home} from './home';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private headers: string[];
    public postResponses: Home[] = [];
    public test: string;
    public dummy: Home;

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
                this.test = this.postResponses[0].title;
                this.dummy = this.postResponses[0];

                console.log(this.postResponses[0].title);
                console.log(this.postResponses);

                // console.log(this.headers);
            });
    }

    // showConfig() {
    //     this.homeService.getConfig()
    //     // clone the data object, using its known Config shape
    //         .subscribe((data: NewPost) => this.postResponses = { ...data });
    //     console.log(this.postResponses);
    //
    // }




    ngOnInit() {
        this.showConfigResponse();

    }


}
