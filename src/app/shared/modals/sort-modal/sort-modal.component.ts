import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SortOption } from 'src/app/core/models/sortoption';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
})
export class SortModalComponent implements OnInit {
  @Output() sortChanged = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SortOption[],
    public dialogRef: MatDialogRef<SortModalComponent>
  ) {}

  ngOnInit(): void {}

  select(option) {
    this.dialogRef.close(option);
  }
}
