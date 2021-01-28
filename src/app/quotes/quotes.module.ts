import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { QuotesComponent } from './quotes.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [QuotesComponent],
  imports: [MaterialModule, CommonModule, SharedModule, QuotesRoutingModule],
})
export class QuotesModule {}
