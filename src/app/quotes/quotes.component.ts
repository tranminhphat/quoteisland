import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  readonly bannerImageUrl = environment.bannerImageUrls.quotesPage;

  constructor() {}

  ngOnInit(): void {}
}
