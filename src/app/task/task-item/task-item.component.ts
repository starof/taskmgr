import { itemAnim } from './../../animate/item.animate';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item: any;
  @Input() avatar: string = '';
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';
  constructor() { }

  ngOnInit(): void {
    this.avatar = this.item.owner ? this.item.owner.avatar : "unassigned";
  }


  @HostListener('mouseenter')
  onmouseenter() {
    this.widerPriority = 'out';
  }
  @HostListener('mouseleave')
  onmouseleave() {
    this.widerPriority = 'in';
  }

  onItemClick() {
    this.taskClick.emit();
  }
  onCheckBoxClick(event: Event) {
    event.stopPropagation();
  }

}
