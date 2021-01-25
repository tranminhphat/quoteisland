import { Quote } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorManagementComponent } from './components/author-management/author-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  { path: 'users', component: UserManagementComponent },
  { path: 'categories', component: CategoryManagementComponent },
  { path: 'quotes', component: QuoteManagementComponent },
  { path: 'authors', component: AuthorManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
