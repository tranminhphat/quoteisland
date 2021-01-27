import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [BannerComponent, HasRoleDirective, PhotoUploaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    MaterialModule,
  ],
  exports: [BannerComponent, PhotoUploaderComponent, HasRoleDirective],
})
export class SharedModule {}
