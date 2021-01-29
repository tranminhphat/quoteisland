import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { QuotesComponent } from './quotes.component';
import { CommentResolver } from './resolvers/comment.resolver';
import { QuoteResolver } from './resolvers/quote.resolver';
import { QuotesResolver } from './resolvers/quotes.resolver';

const routes: Routes = [
  { path: '', component: QuotesComponent, resolve: { quotes: QuotesResolver } },
  {
    path: ':id',
    component: QuoteDetailComponent,
    resolve: { quote: QuoteResolver, comments: CommentResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
