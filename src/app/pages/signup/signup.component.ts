import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserServiceService, private snack: MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  ngOnInit(): void {}
  formSubmit()
  {
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null)
    {
      this.snack.open("Username is Required",'',{duration:3000})
      return;
    }

    this.userService.addUser(this.user).subscribe((data:any) =>{
      console.log(data);
      Swal.fire('Success done!!','User id id'+data.id,'success');
      
    },(error)=>{
      console.log(error);
      this.snack.open("Something Went Wrong",'',{duration:3000})
      
    });
    
    
  }
}
