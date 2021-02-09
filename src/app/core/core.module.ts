import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent, FooterComponent, SidebarComponent
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parent: CoreModule){
    if(parent){
      throw new Error('模块以及存在，不能再次价值！');
    }
  }
 
}
