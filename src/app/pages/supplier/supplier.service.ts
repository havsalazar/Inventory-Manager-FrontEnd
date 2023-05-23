import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment' 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiURL=environment.serverURL
  constructor(private http :HttpClient) { 
    
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getSupplierPagginated():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/supplier`)
  }
  createSupplier(data:any){
    return this.http
      .post (
        this.apiURL + '/supplier',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
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
