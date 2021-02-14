import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item: any;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  onEditClick() {
    this.onEdit.emit()
  }
  onInviteClick() {
    this.onInvite.emit();
  }
  onDeleteClick() {

  }
}
