import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/core/models/pagination';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() quoteId: string;

  commentForm: FormGroup;
  comments: Comment[] = [];
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.comments = data['comments'].items;
      this.pagination = data['comments'].pagination;
    });

    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getComments() {
    this.commentService
      .getComments(this.quoteId, this.pagination)
      .subscribe((response: any) => {
        this.comments = response.items;
        this.pagination = response.pagination;
      });
  }

  postComment() {
    this.commentService
      .commentQuote(this.quoteId, this.commentForm.value.content)
      .subscribe((comment) => {
        this.commentForm.reset();
        this.getComments();
      });
  }

  onPageChanged($event) {
    this.pagination.pageNumber = $event.pageIndex + 1;
    this.getComments();
  }

  onDeleteSuccess() {
    this.getComments();
  }
}
