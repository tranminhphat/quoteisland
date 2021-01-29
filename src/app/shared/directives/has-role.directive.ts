import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole: string[];

  isVisible = false;
  stop$ = new Subject();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.decodedToken$
      .pipe(takeUntil(this.stop$))
      .subscribe((decodedToken: any) => {
        // If the user doesn't have any roles, we clear the viewContainerRef
        const roles = decodedToken && decodedToken.role;
        if (!roles) {
          this.viewContainerRef.clear();
        }
        // If the user has the role needed to
        // render this component we can add it
        if (this.authService.isRoleMatch(this.appHasRole)) {
          // If it is already visible (which can happen if
          // the roles changed) we do not need to add it a second time
          if (!this.isVisible) {
            // We update the `isVisible` property and add the
            // templateRef to the view using the
            // 'createEmbeddedView' method of the viewContainerRef
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          // If the user does not have the role,
          // we update the `isVisible` property and clear
          // the contents of the viewContainerRef
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }

  ngOnDestroy() {
    this.stop$.next();
  }
}
