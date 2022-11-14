import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new  Subject<boolean>();

  constructor(private http:HttpClient) { }


  //current-user: which is logged in
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }



  public generateToken(loginData: any)
  {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public loginUser(token: any)
  {
    localStorage.setItem("token", token);
    
    return true;
  }

  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }
  }


  public logout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return true;
  }

  //get token

  public getToken()
  {
    return localStorage.getItem('token');
  }

  //set user detail
  public setuser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }


  //getUser
  public getUser()
  {
    let userStr=localStorage.getItem("user");
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else
    {
      this.logout();
      return null;
    }
  }

  //get userrole
  public getUserRole()
  {
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
