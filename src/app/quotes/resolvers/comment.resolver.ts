import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/pagination';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentResolver implements Resolve<boolean> {
  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 5,
  };

  constructor(
    private commentService: CommentService,
    private alertService: AlertService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const quoteId = route.paramMap.get('id');

    return this.commentService
      .getComments(quoteId, this.defaultPagination)
      .pipe(
        catchError((err) => {
          this.alertService.showError('Problem retrieving data');
          return of(null);
        })
      );
  }
}
