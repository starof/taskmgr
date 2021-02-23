import { TaskList } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, map, mapTo, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { concat, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private readonly domain = 'TaskLists';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }

  //POST
  add(TaskList: TaskList): Observable<TaskList> {
    TaskList.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.post(uri, JSON.stringify(TaskList)).pipe(
      map(res => res as TaskList)
    )
  }

  //PUT/patch
  update(TaskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${TaskList.id}`;
    const toUpdate = {
      name: TaskList.name //只更新name
    }
    return this.httpClient.patch(uri, JSON.stringify(toUpdate)).pipe(
      map(res => res as TaskList)
    )
  }

  //DELETE
  delete(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.httpClient.delete(uri).pipe(
      mapTo(taskList)
    )
  }

  //GET
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.
      get(uri, { params: { 'projectId': projectId } })
      .pipe(
        map(res => res as TaskList[])
      )
  }


  //拖拽交换两个List顺序
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    //拖拽的原始uri
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const drag$ = this.httpClient
      .patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
      .pipe(map(res => res as TaskList));
    const drop$ = this.httpClient
      .patch(dragUri, JSON.stringify({ order: src.order }), { headers: this.headers })
      .pipe(map(res => res as TaskList));
    return concat(drag$, drop$)
      .pipe(reduce((r: TaskList[], list) => [...r, list], []));
  }



}
