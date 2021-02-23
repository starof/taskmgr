import { Task, TaskList } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, map, mapTo, mergeMap, reduce, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }

  //POST
  add(task: Task): Observable<Task> {
    task.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.post(uri, JSON.stringify(task)).pipe(
      map(res => res as Task)
    )
  }

  //PUT/patch
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      dueDate: task.dueDate,
      reminder: task.reminder,
      priority: task.priority,
      remark: task.remark
    };
    return this.httpClient.patch(uri, JSON.stringify(toUpdate)).pipe(
      map(res => res as Task)
    )
  }

  //DELETE
  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.httpClient.delete(uri).pipe(
      mapTo(task)
    )
  }

  //GET
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.get(uri, { params: { 'taskListId': taskListId } }).pipe(
      map(res => res as Task[])
    )
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return from(lists)
      .pipe(
        mergeMap((list: TaskList) => this.get(<string>list.id)),
        reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], [])
      )
  }

  //完成任务，取消完成任务
  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.httpClient.patch<Task>(
      uri,
      JSON.stringify({ completed: !task.completed }),
      { headers: this.headers }
    ).pipe(map(res => res as Task));
  }

}
