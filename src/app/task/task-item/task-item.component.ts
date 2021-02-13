import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() item: any;
  @Input() avatar: string = '';
  constructor() { }

  ngOnInit(): void {
    this.avatar = this.item.owner ? this.item.owner.avatar : "unassigned";
  }

}
