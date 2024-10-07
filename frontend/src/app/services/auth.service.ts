import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.backendBaseUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signup', {
      username,
      //firstname,
      //lastname,
      email,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'auth/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
