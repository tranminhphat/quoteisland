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
  constructor(private userService: UserService) {}

  getRawData(
    pagination?: Pagination,
    sortMode?: SortMode,
    filterMode?: FilterMode
  ) {
    return this.userService
      .getUsers(pagination, sortMode, filterMode)
      .pipe(
        map((response: any) => {
          // this.pagination = response.pagination;
          return response.items;
        })
      )
      .toPromise();
  }
}
