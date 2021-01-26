import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthorManagementComponent } from './components/author-management/author-management.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    AuthorManagementComponent,
    QuoteManagementComponent,
    CategoryManagementComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
  ],
})
export class AdminModule {}
