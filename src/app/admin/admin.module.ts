import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthorManagementComponent } from './components/author-management/author-management.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { DatatableModule } from '../datatable/datatable.module';
import { UserAddModalComponent } from './modals/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from './modals/user-edit-modal/user-edit-modal.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    AuthorManagementComponent,
    QuoteManagementComponent,
    CategoryManagementComponent,
    UserAddModalComponent,
    UserEditModalComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatatableModule,
  ],
})
export class AdminModule {}
