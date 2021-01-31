import {Component} from '@angular/core';
import { slideInAnimation } from './animations';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './auth/auth.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ slideInAnimation ]
})
export class AppComponent {
    title = 'frontend';
    constructor(public authService: AuthService) {
    }


    getAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }


}

