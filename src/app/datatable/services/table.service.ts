import { FilterMode } from 'src/app/core/models/filtermode';
import { Pagination } from 'src/app/core/models/pagination';
import { SortMode } from 'src/app/core/models/sortmode';

export interface TableService {
  pagination: Pagination;
  sortMode?: SortMode;
  filterMode?: FilterMode;

  getRawData();
}
