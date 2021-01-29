import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBuilder } from 'src/app/utils/params-builder';
import { UrlUtils } from 'src/app/utils/url-utils';
import { environment } from 'src/environments/environment';
import { FilterMode } from '../models/filtermode';
import { Pagination } from '../models/pagination';
import { SortMode } from '../models/sortmode';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly commentUrl = `${environment.apiUrl}/quotes/{quoteId}/comments`;
  private readonly commentDetailUrl = `${environment.apiUrl}/quotes/{quoteId}/comments/{commentId}`;

  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 10,
  };

  private readonly defaultSortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: true,
  };

  constructor(private http: HttpClient) {}

  getComments(
    quoteId: string,
    pagination: Pagination = this.defaultPagination,
    sortMode: SortMode = this.defaultSortMode,
    filterMode?: FilterMode
  ): Observable<Comment[]> {
    const url = UrlUtils.resolveParams(this.commentUrl, { quoteId });
    const params = new ParamsBuilder()
      .applyPagination(pagination)
      .applySort(sortMode)
      .applyFilter(filterMode)
      .build();

    return this.http.get<Comment[]>(url, { params });
  }

  commentQuote(quoteId: string, content: string): Observable<Comment> {
    const url = UrlUtils.resolveParams(this.commentUrl, { quoteId });
    return this.http.post<Comment>(url, { content });
  }

  deleteComment(quoteId: string, commentId: string): Observable<Comment> {
    const url = UrlUtils.resolveParams(this.commentDetailUrl, {
      quoteId,
      commentId,
    });
    return this.http.delete<Comment>(url);
  }
}
