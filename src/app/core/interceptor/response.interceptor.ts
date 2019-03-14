import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { environment } from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logout();
            this.toastrService.info('Incorrect login or password');
            this.router.navigate(['/auth/login']);
          }

          if (err.status === 403) {
            this.authService.logout();
            this.toastrService.info('Your session has been expired');
            this.router.navigate(['/auth/login']);
          }

          if (err.status === 400) {
            this.toastrService.info('Validation error. You must correct the form');
          }
        }
      })
    );
  }
}
