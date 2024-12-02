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
  acceptLoan(id: number, loanDate: string) {
    return this._http.put(`${APIURL}loans/accept/${id}`, { loan_date: loanDate });
}

  deleteLoan(id: number) {
    return this._http.delete(`${APIURL}loans/delete/${id}`);
  }
  handinLoan(id: number, returnDate: string) {
    return this._http.put(`${APIURL}loans/handin/${id}`, { return_date: returnDate });
  }

}
