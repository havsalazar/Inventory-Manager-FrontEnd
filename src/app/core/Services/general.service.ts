import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from './../../../environments/environment' 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError, Observable } from 'rxjs';
import { MODULE_NAME } from 'src/app/core/Inyectors/service.inyector';

@Injectable({
  providedIn: 'root',
})

export class GeneralService {
  private apiURL=environment.serverURL
  constructor(
    @Inject(MODULE_NAME) private moduleName:string,
    private http :HttpClient) {     
  }
  private retryOptions={
      count: 2,
      delay: 2000
    
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getPagginated(directUrl:string=''):Observable<any[]>{
    let module= directUrl?  directUrl:this.moduleName
    return this.http.get<any[]>(`${this.apiURL}/${module}`).pipe(retry(this.retryOptions))
  }
  searchGlobal(search:string , directUrl:string='' ):Observable<any[]>{
    let module= directUrl?  directUrl:this.moduleName
    return this.http.get<any[]>(`${this.apiURL}/${module}/full-text-search/${search}`).pipe(retry(this.retryOptions))
  }
  create(data:any , directUrl:string=''){
    let module= directUrl?  directUrl:this.moduleName
    return this.http
      .post (
        this.apiURL + `/${module}`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(this.retryOptions));
  }
  update(id:string,data:any, directUrl:string=''){
    let module= directUrl?  directUrl:this.moduleName
    return this.http
      .patch (
        this.apiURL + `/${module}/`+id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(this.retryOptions));
  }
  delete(id: string, directUrl:string=''){
    let module= directUrl?  directUrl:this.moduleName
    return this.http
      .delete (
        this.apiURL + `/${module}/`+id,
        this.httpOptions
      )
      .pipe(retry(this.retryOptions));
  }

  getById(id:string, directUrl:string=''):Observable<any>{
    return this.http.get<any[]>(`${this.apiURL}/${this.moduleName}/${id}`).pipe(retry(this.retryOptions))
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
