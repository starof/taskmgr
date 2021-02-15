import { cardAnim } from './../../animate/card.animate';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [cardAnim], // <-- Don't forget!
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @HostBinding('@card') cardState = 'out';
  @Input() item: any;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
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
    this.onDelete.emit();
  }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(target: any) {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(target: any) {
    this.cardState = 'out';
  }
}
