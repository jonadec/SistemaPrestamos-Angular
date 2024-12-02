import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
const APIURL='http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http=inject(HttpClient);
  private router=inject(Router);

  constructor() { }
  
  register(body:{name:string,lastname:string, email:string,username:string,role:string, password:string}){
    return this._http.post(`${APIURL}auth/register`, body);
  }
  login(body:{username:string, password:string}){
    return this._http.post(`${APIURL}auth/login`, body);
  }

  getRole(){
    const role = localStorage.getItem('role') || null;
    return role;
  }
  getUser(){
    const user = localStorage.getItem('id') || null;
    return user;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  
}
