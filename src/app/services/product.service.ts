import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const APIURL='http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http=inject(HttpClient);
  constructor() { }

  getProducts(){
    return this._http.get(APIURL+'products/all');
  }

    
}
