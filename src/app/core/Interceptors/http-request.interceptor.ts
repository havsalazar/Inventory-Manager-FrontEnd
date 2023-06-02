import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,  HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError,   } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import {  NbAuthService } from '@nebular/auth'; 
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor( 
      private authService: NbAuthService,  
    ) {}
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        withCredentials: true,
      });
  
      return next.handle(req).pipe(
        retry(3),
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            !req.url.includes('auth/signin') &&
            error.status === 401
          ) {
            return this.handle401Error(req, next);
          }
  
          return throwError(() => error);
        })
      );
    }
  
    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
  
        if (this.authService.isAuthenticated()) {
          return this.authService.refreshToken('email').pipe(
            switchMap(() => {
              this.isRefreshing = false;
  
              return next.handle(request);
            }),
            catchError((error) => {
              this.isRefreshing = false;  
              if (error.status == '403') { 
              }
  
              return throwError(() => error);
            })
          );
        }
      }
  
      return next.handle(request);
    }
}