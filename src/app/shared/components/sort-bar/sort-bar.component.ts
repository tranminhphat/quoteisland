import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SortOption } from 'src/app/core/models/sortoption';
import { SortModalComponent } from '../../modals/sort-modal/sort-modal.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
})
export class SortBarComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() modalSortOptions: SortOption[];

  @Output() sortChanged = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openSortModal() {
    const dialogRef = this.dialog.open(SortModalComponent, {
      data: this.modalSortOptions,
    });

    dialogRef.afterClosed().subscribe((res) => this.sortChanged.emit(res));
  }
}
