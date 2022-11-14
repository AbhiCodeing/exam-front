import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private categoryService:CategoryService, private snack:MatSnackBar) { }

  categories;

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      this.snack.open("Error in lodaing Categories",'',{duration:3000})
    })
  }

}
