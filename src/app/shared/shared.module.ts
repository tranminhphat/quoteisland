import { NgModule } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { HasRoleDirective } from './directives/has-role.directive';

@NgModule({
  declarations: [BannerComponent, HasRoleDirective],
  exports: [BannerComponent, HasRoleDirective],
})
export class SharedModule {}
