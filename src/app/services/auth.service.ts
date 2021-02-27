import { User } from './../domain/user.model';
import { Auth } from './../domain/auth.model';
import { Project } from './../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { count, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-type': 'application/json'
  });
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private httpClient: HttpClient, @Inject('BASE_CONFIG') private config: any) { }


  //注册
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient
      .get(uri, { params: { 'email': user.email } })
      .pipe(
        switchMap(res => {
          if ((<User[]>res).length > 0) {
            return throwError('username existed');
          }
          return this.httpClient
            .post(uri, JSON.stringify(user), { headers: this.headers })
            .pipe(map(r => ({ token: this.token, user: <User>r })));
        })
      )

  }

  //登录
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.httpClient.get(uri,
      { params: { 'email': username, 'password': password } }
    )
      .pipe(
        map(res => {
          const users = <User[]>res;
          if (users.length === 0) {
            throw new Error('Username or password incorrect');
          }
          return {
            token: this.token,
            user: users[0]
          }
        }))
  }

}
