import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';




import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent,
        HomeComponent,
        SignupComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: 'My-Xsrf-Cookie',
            headerName: 'My-Xsrf-Header',
        }),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
