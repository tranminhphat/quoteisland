import { Quote } from 'src/app/core/models/quote';
import { Component, Input, OnInit } from '@angular/core';
import { StringUtils } from 'src/app/utils/string-utils';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { QuoteService } from 'src/app/core/services/quote.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent implements OnInit {
  @Input() quote: Quote;

  private tokenSubscription: Subscription;
  private currentUserId: string;

  isLoved: boolean;
  numOfLoves: number;
  constructor(
    private authService: AuthService,
    private quoteService: QuoteService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.tokenSubscription = this.authService.decodedToken$.subscribe(
      (token) => {
        if (token) {
          this.currentUserId = token.id;
        }
      }
    );

    this.updateValues();
  }

  getQuoteText() {
    return StringUtils.truncate(this.quote.text, 150);
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
    this.numOfLoves = this.quote.loveCount || this.quote.loves.length;
  }
}
