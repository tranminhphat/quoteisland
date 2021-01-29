import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quote } from 'src/app/core/models/quote';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.scss'],
})
export class QuoteDetailComponent implements OnInit, OnDestroy {
  bannerImageUrl = environment.bannerImageUrls.quoteDetailPage;

  private tokenSubscription: Subscription;
  private currentUserId: string;

  quote: Quote;
  isLoved: boolean;
  numOfLoves: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private quoteService: QuoteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log(res);
      this.quote = res['quote'];

      if (this.quote.photoUrl) {
        this.bannerImageUrl = this.quote.photoUrl;
      }
    });

    this.tokenSubscription = this.authService.decodedToken$.subscribe(
      (token) => {
        if (token) {
          this.currentUserId = token.id;
          this.updateValues();
        }
      }
    );
  }

  loveQuote() {
    if (!this.currentUserId) {
      this.alertService.showError('You need to login to love this quote');
      return;
    }

    if (this.isLoved) {
      this.numOfLoves -= 1;
    } else {
      this.numOfLoves += 1;
    }

    this.isLoved = !this.isLoved;

    this.quoteService.loveQuote(this.quote._id).subscribe((quote: Quote) => {
      this.quote = quote;
      this.updateValues();
    });
  }

  private updateValues() {
    this.isLoved =
      this.currentUserId && this.quote.loves.includes(this.currentUserId);
    this.numOfLoves = this.quote.loves.length;
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
