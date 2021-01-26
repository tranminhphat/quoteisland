import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filtermode';
import { Pagination } from 'src/app/core/models/pagination';
import { SortMode } from 'src/app/core/models/sortmode';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementTableServiceService {
  columns: TableColumn[] = [
    { name: '_id', text: 'ID', type: 'IdTableCellComponent', sortable: true },
    {
      name: 'username',
      text: 'Username',
      type: 'TextTableCellComponent',
      sortable: true,
    },
    {
      name: 'firstName',
      text: 'First Name',
      type: 'TextTableCellComponent',
      sortable: true,
    },
    {
      name: 'lastName',
      text: 'Last Name',
      type: 'TextTableCellComponent',
      sortable: true,
    },
    {
      name: 'roles',
      text: 'Roles',
      type: 'ArrayListTableCellComponent',
      sortable: false,
    },
    {
      name: 'createdAt',
      text: 'Created',
      type: 'DateTableCellComponent',
      sortable: true,
    },
    {
      name: 'actions',
      text: 'Actions',
      type: 'ActionsTableCellComponent',
      sortable: false,
    },
  ];

  // rows: TableRow[];

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true,
  };

  filterMode: FilterMode = {};

  // actions: TableAction[] = [
  //   { class: 'btn-primary', icon: 'fa fa-edit', text: 'Edit', type: TableActionType.Edit },
  //   { class: 'btn-danger', icon: 'fa fa-trash', text: 'Delete', type: TableActionType.Delete }
  // ];

  constructor(private userService: UserService) {}

  getRawData() {
    return this.userService
      .getUsers(this.pagination, this.sortMode, this.filterMode)
      .pipe(
        map((response: any) => {
          this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }
}
