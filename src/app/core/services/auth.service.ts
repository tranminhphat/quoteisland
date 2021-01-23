import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_URL = `${environment.apiUrl}/auth`;

  private jwtHelper = new JwtHelperService();
  private decodedToken = null;
  private decodedTokenSubject = new BehaviorSubject(this.decodedToken);
  public decodedToken$ = this.decodedTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  private changeDecodedToken(token: string) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.decodedTokenSubject.next(this.decodedToken);
  }

  private getUserInfo(token: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.AUTH_URL}/me`, { headers });
  }

  getTokenFromStorage() {
    const token = localStorage.getItem('token');
    this.getUserInfo(token).subscribe(
      (user: User) => {
        if (user.username) {
          this.changeDecodedToken(token);
        }
      },
      (error) => this.logout()
    );
  }

  login(model: any) {
    return this.http.post(`${this.AUTH_URL}/login`, model).pipe(
      map(({ token }: any) => {
        if (token) {
          localStorage.setItem('token', token);
          this.changeDecodedToken(token);
        }
      })
    );
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    console.log(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    this.changeDecodedToken(null);
    localStorage.removeItem('token');
  }
}
