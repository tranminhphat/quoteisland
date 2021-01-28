import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss'],
})
export class UserDeleteModalComponent {
  constructor(
    public dialogDeleteRef: MatDialogRef<UserDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {}

  onNoClick() {
    this.dialogDeleteRef.close(false);
  }

  onYesClick() {
    this.data().subscribe(() =>
      this.alertService.showSuccess('Delete successfully')
    );
    this.dialogDeleteRef.close(true);
  }
}
