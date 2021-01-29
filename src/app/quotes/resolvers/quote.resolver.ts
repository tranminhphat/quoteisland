import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { QuoteService } from 'src/app/core/services/quote.service';

@Injectable({
  providedIn: 'root',
})
export class QuoteResolver implements Resolve<boolean> {
  constructor(
    private router: Router,
    private quoteService: QuoteService,
    private alertService: AlertService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const quoteId = route.paramMap.get('id');

    return this.quoteService.getQuote(quoteId).pipe(
      catchError((error) => {
        this.alertService.showError('Problem retrieving data');
        this.router.navigate(['/quotes']);
        return of(null);
      })
    );
  }
}
