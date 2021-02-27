import { Project } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }

  //注册
  register(project: Project): Observable<Project> {
    project.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.post<Project>(uri, JSON.stringify(project), { headers: this.headers }).pipe(
      map(res => res as Project)
    )
  }

  //登录
  login(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }
    return this.httpClient.patch(uri, JSON.stringify(toUpdate), { headers: this.headers }).pipe(
      map(res => res as Project)
    )
  }

}
