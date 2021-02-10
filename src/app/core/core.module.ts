import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../shared/shared.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.util';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent, FooterComponent, SidebarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry,
  ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('模块已经存在，不能再次导入！');
    }
    loadSvgResources(ir, ds)
  }

}
