import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../Interface/User';
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: '*/*',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:2000/api/';
  constructor(private http: HttpClient, private router: Router) {}
  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}user/login`, user, options);
  }
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}user/`, user, options);
  }
  verifyIsLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user != null;
  }
  getLoggedInUser(): Observable<any> {
    const id = localStorage.getItem('currentUser');
    return this.http.get(`${this.apiUrl}user/${id}`, options);
  }
  getUser(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}user/${id}`, options);
  }
  getUserUrl() {
    return `${location.origin}/message/${localStorage.getItem('currentUser')}`;
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
}
