import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressAnimationType, ToastrModule } from 'ngx-toastr';
import { SkipSelf, Optional, NgModule } from '@angular/core';

import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

const toastrOptions = {
  timeOut: 3000,
  positionClass: 'toast-bottom-right',
  progressBar: true,
  progressAnimation: 'increasing' as ProgressAnimationType,
};

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions),
  ],
  providers: [AlertService, AuthService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
