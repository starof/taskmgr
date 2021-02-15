import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//数据结构
export interface DragData {
  tag: string,//多重拖拽的话，是哪一级拖拽，用户自己包装唯一性，不能重复
  data: any //传递的数据
}


@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  //用BehaviorSubject总能记住上一次的值
  private _dragData = new BehaviorSubject<DragData | null>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData() {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

  constructor() { }
}
