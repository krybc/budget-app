import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from '@auth';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
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
            this.snackBar.open(`Incorrect login or password`, 'Close');
            this.router.navigate(['/auth/login']);
          }

          if (err.status === 403) {
            this.authService.logout();
            this.snackBar.open(`Your session has been expired`, 'Close');
            this.router.navigate(['/auth/login']);
          }

          if (err.status === 400) {
            this.snackBar.open(`Validation error. You must correct the form`, 'Close');
          }
        }
      })
    );
  }
}
