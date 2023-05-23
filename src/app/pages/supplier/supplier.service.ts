import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  getSupplierPagginated(){
    return this.http.get(`${environment.serverURL}/supplier`)
  }
}
