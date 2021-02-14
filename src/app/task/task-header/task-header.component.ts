import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header: string = '';
  @Output() newTask = new EventEmitter<void>();
  @Output() moveAll = new EventEmitter<void>();
  @Output() deleteList = new EventEmitter<void>();
  @Output() editList = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onNewTaskClick() {
    this.newTask.emit();
  }
  OnCopyTaskClick() {
    this.moveAll.emit();
  }
  OnDeleteListClick() {
    this.deleteList.emit();
  }
  OnEditListClick() {
    this.editList.emit();
  }
}
