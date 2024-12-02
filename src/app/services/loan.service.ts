import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
const APIURL='http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private _http=inject(HttpClient);
  private router=inject(Router);

  constructor() { }
  newLoan(loan:any){
    return this._http.post(APIURL+'loans/create',loan);
  }
  getLoans(){
    return this._http.get(APIURL+'loans/all');
  }
}
