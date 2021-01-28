import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagination } from 'src/app/core/models/pagination';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable({
  providedIn: 'root',
})
export class QuotesResolver implements Resolve<boolean> {
  private readonly defaultPagination: Pagination = {
    pageNumber: 1,
    pageSize: 2,
  };

  constructor(
    private quoteService: QuoteService,
    private alertService: AlertService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.quoteService.getQuotes(this.defaultPagination).pipe(
      catchError((error) => {
        this.alertService.showError('Problem retrieving data');
        return of(null);
      })
    );
  }
}
