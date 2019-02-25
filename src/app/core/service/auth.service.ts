import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserModel} from '../model/user.model';
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';
  private currentUserKey = 'current-user';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.isAuthenticated();
  }

  login(user: UserModel): Observable<any> {
    return this.http.post<any>('auth/signin', user)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token);
            this.setUser(response.token);
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

  getUser(): UserModel {
    return plainToClass(UserModel, JSON.parse(localStorage.getItem(this.currentUserKey)) as Object);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }
}
