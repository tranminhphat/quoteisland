import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DatatableComponent } from './datatable.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DatatableComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [DatatableComponent],
})
export class DatatableModule {}
