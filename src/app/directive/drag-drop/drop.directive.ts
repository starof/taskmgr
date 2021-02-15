import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { DragDropService, DragData } from './../drag-drop.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[app-droppable][dropTags][dragEnterClass]'
})
export class DropDirective {
  @Output()
  dropped = new EventEmitter<DragData>();

  @Input()
  dragEnterClass: string = '';

  @Input()
  dropTags: string[] = [];
  private data$: Observable<DragData | null>;
  constructor(private el: ElementRef, private renderer: Renderer2, private service: DragDropService) {
    this.data$ = this.service.getDragData().pipe(take(1));

  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (dragData && this.dropTags.includes(dragData.tag)) {
          this.renderer.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    //需要支持多级拖拽，所以要防止事件冒泡
    event.preventDefault();
    event.stopPropagation();
    //判断drag元素是不是指令应用的元素发起的
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (dragData && this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'all');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'none');
        } else {
          this.renderer.setProperty(event, 'dataTransfer.effectAllowed', 'none');
          this.renderer.setProperty(event, 'dataTransfer.dropEffect', 'none');
        }
      });
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (dragData && this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      });
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    //判断drag元素是不是指令应用的元素发起的
    if (this.el.nativeElement === event.target) {
      this.data$.subscribe(dragData => {
        if (dragData && this.dropTags.indexOf(dragData.tag) > -1) {
          this.renderer.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      });
    }
  }

}
