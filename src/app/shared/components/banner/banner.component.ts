import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  @Input() height = '350px';
  @Input() imageUrl: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  getSanitizedImageUrl() {
    return this.sanitizer
      .bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)),
        url(${this.imageUrl})`);
  }
}
