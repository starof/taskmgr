import { Project, User } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, map, mapTo, mergeMap, reduce, switchMap, filter } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }

  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.get(uri, { params: { 'emails_like': filter } }).pipe(
      map(res => res as User[])
    )
  }

  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.get(uri, { params: { 'projectId': projectId } }).pipe(
      map(res => res as User[])
    )
  }

  //把项目加到user中
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return of(user);
    }
    return this.httpClient.patch(
      uri,
      JSON.stringify({ projectIds: [...projectIds, projectId] }),
      { headers: this.headers }
    ).pipe(
      map(res => res as User)
    )
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)]
    return this.httpClient.patch(
      uri,
      JSON.stringify({ projectIds: toUpdate }),
      { headers: this.headers }
    ).pipe(
      map(res => res as User)
    )
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = <string>project.id;
    const memberIds: string[] = project.members ? project.members : [];
    return from(memberIds).pipe(
      switchMap(id => { //根据userId取得user信息
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.httpClient.get(uri) as Observable<User>;
      }),
      filter(
        (user: User) => //把项目加到user中
          user.projectIds ? user.projectIds.indexOf(projectId) < 0 : false
      ),
      switchMap((u: User) => this.addProjectRef(u, projectId)),
      reduce((users: User[], curr: User) => [...users, curr], [])
    );
  }

}
