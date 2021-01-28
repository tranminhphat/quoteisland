import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [QuotesComponent],
  imports: [CommonModule, SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
