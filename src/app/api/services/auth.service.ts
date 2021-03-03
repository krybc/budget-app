import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserApiModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private tokenKey = 'auth-token';
  private currentUserKey = 'current-user';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.isAuthenticated();
  }

  login(user: UserApiModel): Observable<any> {
    return this.http.post<any>('auth/login', user)
      .pipe(
        tap((response) => {
          if (response.accessToken) {
            this.setToken(response.accessToken);
            this.setUser(response.accessToken);
          }
        })
      );
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  setUser(token: string) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(this.jwtHelper.decodeToken(token)));
  }

  getUser(): UserApiModel {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }
}
