import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
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
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
