import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { environment } from 'src/environments/environment';
import { FilterMode } from '../models/filtermode';
import { Pagination } from '../models/pagination';
import { SortMode } from '../models/sortmode';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly quoteUrl = `${environment.apiUrl}/quotes`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false,
  };

  constructor(private http: HttpClient) {}

  getQuotes(
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Quote[]> {
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Quote[]>(`${this.quoteUrl}`, { params: params });
  }

  getQuote() {}

  loveQuote(id: string): Observable<Quote> {
    return this.http.post<Quote>(`${this.quoteUrl}/${id}/love`, null);
  }
}
