import { OnInit, TemplateRef } from '@angular/core';
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];

  stop$ = new Subject();

  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.decodedToken$
      .pipe(takeUntil(this.stop$))
      .subscribe((decodedToken: any) => {
        const roles = decodedToken && decodedToken.roles;
        if (!roles) {
          this.viewContainerRef.clear();
        }
        if (this.authService.isRoleMatch(this.appHasRole)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      });
  }
  ngOnDestroy() {
    this.stop$.next();
  }
}
