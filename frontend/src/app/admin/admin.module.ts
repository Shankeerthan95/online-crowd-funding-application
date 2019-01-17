import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
  ]
})
export class AdminModule { }
