import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Pagination } from '../models/pagination';
import { SortMode } from '../models/sortmode';
import { FilterMode } from '../models/filtermode';
import { ParamsBuilder } from 'src/app/utils/params-builder';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userUrl = `${environment.apiUrl}/users`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false,
  };

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getUsers(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<User[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<User[]>(`${this.userUrl}`, { params });
  }
}
