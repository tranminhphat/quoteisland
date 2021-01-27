import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { FilterMode } from 'src/app/core/models/filtermode';
import { Pagination } from 'src/app/core/models/pagination';
import { SortMode } from 'src/app/core/models/sortmode';
import { TableColumn } from 'src/app/core/models/tablecolumn';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { UserAddModalComponent } from '../modals/user-add-modal/user-add-modal.component';
import { UserEditModalComponent } from '../modals/user-edit-modal/user-edit-modal.component';

@Injectable({
  providedIn: 'root',
})
export class UserManagementTableServiceService {
  constructor(private userService: UserService, private dialog: MatDialog) {}

  pagination: Pagination = {
    pageNumber: 1,
    pageSize: 3,
  };

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true,
  };

  filterMode: FilterMode = {};

  getRawData() {
    return this.userService
      .getUsers(this.pagination, this.sortMode, this.filterMode)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .toPromise();
  }

  openAddModal() {
    const dialogAddRef = this.dialog.open(UserAddModalComponent, {
      width: '400px',
    });

    return dialogAddRef;
  }

  openEditModal(userData: User) {
    const dialogEditRef = this.dialog.open(UserEditModalComponent, {
      data: userData,
      width: '400px',
    });

    return dialogEditRef;
  }

  onDeleteUser(id: string) {
    return this.userService.deleteUser(id);
  }
}
