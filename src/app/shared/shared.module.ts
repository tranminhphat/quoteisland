import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../material.module';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { QuoteCardComponent } from './components/quote-card/quote-card.component';
import { SortModalComponent } from './modals/sort-modal/sort-modal.component';
import { QuotesRoutingModule } from '../quotes/quotes-routing.module';

@NgModule({
  declarations: [
    BannerComponent,
    HasRoleDirective,
    PhotoUploaderComponent,
    SortBarComponent,
    QuoteCardComponent,
    SortModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MaterialModule,
    QuotesRoutingModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BannerComponent,
    PhotoUploaderComponent,
    SortBarComponent,
    QuoteCardComponent,
    HasRoleDirective,
  ],
})
export class SharedModule {}
