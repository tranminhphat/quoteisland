import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes.component';
import { QuotesResolver } from './resolvers/quotes.resolver';

const routes: Routes = [
  { path: '', component: QuotesComponent, resolve: { quotes: QuotesResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
