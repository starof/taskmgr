import { Project } from './../domain';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-type': 'application/json'
  });
  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }

  //POST
  add(project: Project): Observable<Project> {
    project.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.post(uri, JSON.stringify(project)).pipe(
      map(res => res as Project)
    )
  }

  //PUT/patch
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }
    return this.httpClient.patch(uri, JSON.stringify(toUpdate)).pipe(
      map(res => res as Project)
    )
  }

  //DELETE
  delete(project: Project): Observable<Project> {
    project.id = undefined;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.post(uri, JSON.stringify(project)).pipe(
      map(res => res as Project)
    )
  }

  //GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.get(uri, { params: { 'members_like': userId } }).pipe(
      map(res => res as Project[])
    )
  }



}
