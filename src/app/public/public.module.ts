import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
  ],
  exports: [HeaderComponent],
})
export class PublicModule {}
