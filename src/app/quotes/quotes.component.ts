import { Quote } from '../core/models/quote';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pagination } from '../core/models/pagination';
import { SortMode } from '../core/models/sortmode';
import { SortOption } from '../core/models/sortoption';
import { QuoteService } from '../core/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  readonly bannerImageUrl = environment.bannerImageUrls.quotesPage;
  readonly modalSortOptions: SortOption[] = [
    {
      name: 'Alphabetical',
      iconClassName: 'fa fa-sort-alpha-asc',
      sortMode: { sortBy: 'text', isSortAscending: true },
    },
    {
      name: 'Latest',
      iconClassName: 'fa fa-clock-o',
      sortMode: { sortBy: 'createdAt', isSortAscending: false },
    },
    {
      name: 'Most Love',
      iconClassName: 'fa fa-heart',
      sortMode: { sortBy: 'loveCount', isSortAscending: false },
    },
  ];

  quotes: Quote[] = [];
  pagination: Pagination;

  sortMode: SortMode = {
    sortBy: 'createdAt',
    isSortAscending: false,
  };

  constructor(
    private route: ActivatedRoute,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.quotes = data['quotes'].items;
      this.pagination = data['quotes'].pagination;
    });
  }

  getQuotes() {
    this.quoteService
      .getQuotes(this.pagination, this.sortMode)
      .subscribe((res: any) => {
        this.quotes = res.items;
        this.pagination = res.pagination;
      });
  }

  onPageChange($event) {
    this.pagination.pageNumber = $event.pageIndex + 1;
    this.getQuotes();
  }

  onSortChanged(sortMode: SortMode) {
    this.sortMode = sortMode;
    this.getQuotes();
  }
}
