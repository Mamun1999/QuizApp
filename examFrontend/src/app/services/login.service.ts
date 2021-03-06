import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

public loginStatusSubject=new Subject<boolean>();

  //we need to send the request to server thats why we have to take httpClient
  constructor(private http: HttpClient) { }
//Curren User who is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData)
  }

  //login user : set token in localStrorage
  public loginUser(token: any): boolean {
    localStorage.setItem("token", token);
    
    return true;

  }

  //isLogin: user is logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //logout: remove token from localStorage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set User Detail
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);//converting user in json
    }
    else {
      this.logout();
      return null;

    }
  }

  //get user role
  public getUserRole(){
    let user= this.getUser();

    return user.authorities[0].authority;
  }
}
