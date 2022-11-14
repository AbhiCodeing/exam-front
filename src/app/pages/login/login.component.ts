import { getLocaleMonthNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData ={
    username:"",
    password:""
  }

  constructor(private snack:MatSnackBar, private loginService: LoginService , private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit()
  {
    console.log("Login button clicked");
    console.log(this.loginData);
    if(this.loginData.username.trim()=='' || this.loginData.password== null)
    {
      this.snack.open("Username is required",'',{duration:3000});
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password.trim()== null)
    {
      this.snack.open("Password is required",'',{duration:3000});
      return;
    }
    
    this.loginService.generateToken(this.loginData).subscribe((data: any) =>{
      console.log("success");
      console.log(data);


      this.loginService.loginUser(data.token);

      this.loginService.getCurrentUser().subscribe((user:any)=>{
         this.loginService.setuser(user);
         console.log(user);

         if(this.loginService.getUserRole()=="ADMIN")
         {
          //admin user
          //window.location.href='/admin'
          this.router.navigate(['/admin']);
          this.loginService.loginStatusSubject.next(true);
         }

         else if(this.loginService.getUserRole()=="NORMAL")
         {
           //window.location.href='/user'
            this.router.navigate(['/user/0']);
            this.loginService.loginStatusSubject.next(true);
         }
         else{
          this.loginService.logout();
         }
         
         
      })
      
    },(error)=>{
      console.log("Error !");
      console.log(error);

      this.snack.open("invalid details || try again",'',{duration:3000});
      
      
    });
    
  }
}
