import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);
  decodeUserData()
  {
    let encodedToken =JSON.stringify( localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

   //private DB_URL = "http://localhost:3000/users";


  constructor(private myClient:HttpClient, private _Router:Router) {

    // if(localStorage.getItem('userToken')!==null)
    // {
    //   this.decodeUserData();

    // }
   }

 registerToAPI(userData:any):Observable<any>
 {
  return this.myClient.post("https://localhost:44301/api/Account/Register",userData);//link_DB_register     return this.myClient.post(`${this.DB_URL}/register`, userData);

 }
 

//  registerToAPI(userData:any):Observable<any>
//  {
//   return this.myClient.post("this.DB_URL",userData);//link_DB_register     return this.myClient.post(`${this.DB_URL}/register`, userData);

//  }
//  loginFormToAPI(userData:any):Observable<any>
//  {
//   return this.myClient.post("http://localhost:3000/login",userData);//link_DB_login
//  }

 loginFormToAPI(email: string, password: string): Observable<any> {
  const userData = { email, password };
  return this.myClient.post("https://localhost:44301/api/Account/Login", userData);
}
 logout()
 {
  localStorage.removeItem('userToken');
  this.userData.next(null);
  this._Router.navigate(['/login']);
 }
 
}
