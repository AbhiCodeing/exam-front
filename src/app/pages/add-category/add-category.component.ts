import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import baseUrl from 'src/app/services/helper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:''
    };
  constructor(private _category:CategoryService, private snack:MatSnackBar,private route:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this.snack.open("Title Required",'',{duration:3000});
      return;
    }

      this._category.addCategory(this.category).subscribe((data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!","Category Added Successfuly",'success');
      },(error)=>{
        Swal.fire("Error !!","Server Error !!",'error');
      });
      //this.route.navigate('local/admin/categories')
      
  } 
}


