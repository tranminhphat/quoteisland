import { Component, ViewChild } from '@angular/core';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
import { environment } from 'src/environments/environment';
import { UserManagementTableServiceService } from '../../services/user-management-table-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  readonly bannerImageUrls = environment.bannerImageUrls.adminPage;

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  displayedColumns: TableColumn[] = [
    { def: '_id', colName: 'ID' },
    { def: 'firstName', colName: 'First name' },
    { def: 'lastName', colName: 'Last name' },
    { def: 'roles', colName: 'Roles' },
    { def: 'username', colName: 'Username' },
    { def: 'options', colName: 'Options' },
  ];
  value = '';

  constructor(public tableService: UserManagementTableServiceService) {}

  openAddModal() {
    const dialog = this.tableService.openAddModal();
    dialog.afterClosed().subscribe(() => this.datatable.refresh());
  }
}
