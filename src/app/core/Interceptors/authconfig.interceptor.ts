import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, catchError, of, retry, switchMap, tap, throwError } from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.getToken().pipe(
      switchMap(token => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(newRequest).pipe( 
          catchError(
            (error: HttpErrorResponse): Observable<any> => { 
              if (error.status === 401) { 
                return this.authService.refreshToken().pipe(switchMap(() => {
                  return this.authService.getToken().pipe(
                    switchMap(token => {
                      const newRequest = request.clone({
                        setHeaders: {
                          Authorization: `Bearer ${token}`
                        }
                      }); 
                      return next.handle(newRequest);
                    })
                  )
                }),catchError((error:any)=>{return throwError(()=>error)})  ) 

              }
              return throwError(() => error);
            },
          ),
        )
      })
    );
  }
}