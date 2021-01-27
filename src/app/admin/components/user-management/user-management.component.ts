import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { environment } from 'src/environments/environment';
import { UserAddModalComponent } from '../../modals/user-add-modal/user-add-modal.component';
import { UserManagementTableServiceService } from '../../services/user-management-table-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  readonly bannerImageUrls = environment.bannerImageUrls.adminPage;
  displayedColumns: TableColumn[] = [
    { def: '_id', colName: 'ID' },
    { def: 'firstName', colName: 'First name' },
    { def: 'lastName', colName: 'Last name' },
    { def: 'roles', colName: 'Roles' },
    { def: 'username', colName: 'Username' },
    { def: 'options', colName: 'Options' },
  ];
  value = '';

  constructor(
    public tableService: UserManagementTableServiceService,
    public dialog: MatDialog
  ) {}

  openAddModal() {
    const dialogRef = this.dialog.open(UserAddModalComponent, {
      width: '400px',
    });
  }
}
