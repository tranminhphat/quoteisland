import { Component, OnInit, ViewChild } from '@angular/core';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { environment } from 'src/environments/environment';
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

  constructor(public tableService: UserManagementTableServiceService) {}
}
