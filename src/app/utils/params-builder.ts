import { HttpParams } from '@angular/common/http';
import { FilterMode } from '../core/models/filtermode';
import { Pagination } from '../core/models/pagination';
import { SortMode } from '../core/models/sortmode';

export class ParamsBuilder {
  private params: HttpParams;

  constructor() {
    this.params = new HttpParams();
  }

  applyPagination(pagination: Pagination) {
    this.params = this.params
      .set('pageNumber', pagination.pageNumber.toString())
      .set('pageSize', pagination.pageSize.toString());

    return this;
  }

  applySort(sortMode: SortMode) {
    let sortString: string;
    if (sortMode.isSortAscending) {
      sortString = `+${sortMode.sortBy}`;
    } else {
      sortString = `-${sortMode.sortBy}`;
    }

    if (sortString) {
      this.params = this.params.set('sort', sortString);
    }

    return this;
  }

  applyFilter(filterMode: FilterMode) {
    let filterString = '';
    for (const key in filterMode) {
      if (filterMode[key]) {
        filterString += `${key}:${filterMode[key]}`;
      }
    }

    if (filterString) {
      this.params = this.params.set('filter', filterString);
    }

    return this;
  }

  build(): HttpParams {
    return this.params;
  }
}
