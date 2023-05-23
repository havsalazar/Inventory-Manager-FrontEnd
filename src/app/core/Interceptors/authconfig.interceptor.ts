import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http"; 
import { AuthService } from "./auth.service";
import { switchMap, tap } from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return this.authService.getToken().pipe(
            //tap(token => '' = token), // side effect to set token property on auth service
            switchMap(token => { // use transformation operator that maps to an Observable<T>
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
      
              return next.handle(newRequest);
            })
          );



        // req = req.clone({
        //     setHeaders: {
        //         Authorization: "Bearer " + this.authService.getToken()
        //     }
        // });
        // return next.handle(req);

    }
}