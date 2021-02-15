import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-draggable][draggedClass]'
})
export class DragDirective {
  private _isDraggable = false;

  @Input('app-draggable')
  set isDraggable(value: boolean) {
    this._isDraggable = value;
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', `${value}`);
  }
  get isDraggable() {
    return this._isDraggable;
  }

  @Input()
  draggedClass: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  ondragstart(event: Event) {
    //判断drag元素是不是指令应用的元素发起的
    if (this.el.nativeElement === event.target) {
      this.renderer.addClass(this.el.nativeElement, this.draggedClass); //给el增加一个class
    }
  }

  @HostListener('dragend', ['$event'])
  ondragend(event: Event) {
    if (this.el.nativeElement === event.target) {
      this.renderer.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }
}
