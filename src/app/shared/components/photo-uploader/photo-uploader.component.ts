import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { VirtualAction } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss'],
})
export class PhotoUploaderComponent implements OnInit {
  private readonly uploadUrl = `${environment.apiUrl}/images/upload/cloudinary`;
  @ViewChild('fileSelect') fileSelect: ElementRef;
  @Output() uploadSucceed = new EventEmitter();
  @Output() uploadFailed = new EventEmitter();

  uploader: FileUploader;
  hasDropZoneOver = false;

  constructor() {}

  ngOnInit(): void {
    this.initUploader();
  }

  private initUploader() {
    const token = localStorage.getItem('token');
    this.uploader = new FileUploader({
      url: this.uploadUrl,
      itemAlias: 'image',
      authToken: `Bearer ${token}`,
      isHTML5: true,
      queueLimit: 1,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (item) => {
      item.withCredentials = false;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      if (status === 200) {
        this.uploadSucceed.emit(JSON.parse(response));
        this.fileSelect.nativeElement.value = '';
      } else {
        this.uploader.clearQueue();
        this.uploadFailed.emit();
      }
    };
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }
}
