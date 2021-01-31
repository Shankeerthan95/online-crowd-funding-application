import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsModule } from 'angular-alert-module';


@NgModule({
  declarations: [
      LoginComponent
  ],
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AlertsModule.forRoot(),
      AuthRoutingModule
  ]
})
export class AuthModule { }
