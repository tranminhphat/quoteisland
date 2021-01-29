import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { QuoteDetailComponent } from './components/quote-detail/quote-detail.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';

@NgModule({
  declarations: [QuotesComponent, QuoteDetailComponent, CommentSectionComponent, CommentItemComponent],
  imports: [MaterialModule, CommonModule, SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
