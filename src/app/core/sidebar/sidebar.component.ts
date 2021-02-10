import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {getDate} from 'date-fns'; //getDate取得是一个月的几号

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() navClick = new EventEmitter<void>();
  today = 'day';
  constructor() { }

  ngOnInit() {
    this.today=`day${getDate(new Date())}`; //today对应icon的名字
  }

  onNavClick(){
    this.navClick.emit();
  }

}
