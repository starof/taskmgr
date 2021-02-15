import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-droppable][dragEnterClass]'
})
export class DropDirective {
  @Input()
  dragEnterClass: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.renderer.addClass(this.el.nativeElement, this.dragEnterClass)
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    //判断drag元素是不是指令应用的元素发起的
    if (this.el.nativeElement === event.target) {

    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.renderer.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    //判断drag元素是不是指令应用的元素发起的
    if (this.el.nativeElement === event.target) {
      this.renderer.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

}
