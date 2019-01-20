import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {PostDetailsComponent} from './home/post-details/post-details.component';

const routes: Routes = [
    // {path : 'login', component : LoginComponent , data: { animation: 'login' }},
    {path : 'signup', component : SignupComponent, data: { animation: 'signup' }},
    {path : 'home', component : HomeComponent, data: { animation: 'home' }},
    {path : 'home/:id', component : PostDetailsComponent, data: { animation: 'home' }},

    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
    },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [SignupComponent];