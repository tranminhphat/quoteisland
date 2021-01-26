import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserManagementTableServiceService } from '../../services/user-management-table-service.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  readonly bannerImageUrls = environment.bannerImageUrls.adminPage;
  value = '';
  displayedColumns: string[] = [
    'id',
    'first name',
    'last name',
    'roles',
    'username',
  ];
  usersData: any;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tableService: UserManagementTableServiceService) {}

  ngOnInit() {
    this.tableService.getRawData().then((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {}

  getUsers() {
    this.tableService.getRawData().then((res) => console.log(res));
  }

  sortData($event) {
    console.log($event);
  }

  showRoles(roles: []): string {
    return roles
      .map((role: { id: string; name: string }) => role.name)
      .join(', ');
  }
}
