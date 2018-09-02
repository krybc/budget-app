import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add api url
    req = req.clone({ url: environment.apiUrl + '/' + req.url});

    const token = this.authService.getToken();
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', `JWT ${token}`) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    // setting the accept header
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req);
  }
}
