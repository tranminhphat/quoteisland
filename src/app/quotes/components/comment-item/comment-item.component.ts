import {
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/core/models/comment';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { environment } from 'src/environments/environment';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'delete-modal',
  template: `
    <h1 mat-dialog-title>Confirm delete</h1>
    <div mat-dialog-content>Are you want to delete?</div>
    <div mat-dialog-acitons class="buttonActions">
      <button mat-raised-button (click)="onNoClick()">No</button>
      <button mat-raised-button color="warn" (click)="onYesClick()">Yes</button>
    </div>
  `,
})
export class DeleteModalComponent {
  constructor(
    public dialogDeleteRef: MatDialogRef<DeleteModalComponent>,
    private alertService: AlertService
  ) {}

  onNoClick() {
    this.dialogDeleteRef.close(false);
  }

  onYesClick() {
    this.dialogDeleteRef.close(true);
  }
}

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, OnDestroy {
  readonly defaultPhotoUrl = environment.defaultUserPhotoUrl;

  @Input() comment: Comment;
  @Output() deleteSuccess = new EventEmitter();

  private tokenSubscription: Subscription;
  private currentUserId: string;

  canDelele: boolean;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private commentService: CommentService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.tokenSubscription = this.authService.decodedToken$.subscribe(
      (token) => {
        if (token) {
          this.currentUserId = token.id;
          this.updateValue();
        }
      }
    );
  }

  openDeleteModal() {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteComment();
      }
    });
  }

  deleteComment() {
    this.commentService
      .deleteComment(this.comment.quote, this.comment._id)
      .subscribe(
        () => {
          this.alertService.showSuccess('Delete comment successfully');
          this.deleteSuccess.emit();
        },
        (err) => {
          this.alertService.showError('Delete comment failed');
        }
      );
  }

  private updateValue() {
    if (this.currentUserId) {
      this.canDelele = this.comment.user._id === this.currentUserId;
    }
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
