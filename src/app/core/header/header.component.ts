import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  constructor(private iconRegistry:MatIconRegistry, private sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon('gift', sanitizer.bypassSecurityTrustResourceUrl('assets/gift.svg'))
  }

  ngOnInit(): void {
  }
  openSideBar(){
    this.toggle.emit('clicked');
  }

}
