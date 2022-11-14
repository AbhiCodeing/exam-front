import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId=0;
  quiz:any;
  categories:any;



  constructor(private route:ActivatedRoute, private _quiz:QuizServiceService,private _cat:CategoryService,
     private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    //alert(this.qId);

    this._quiz.getSingleQuiz(this.qId).subscribe((data:any)=>{
      this.quiz=data;
      console.log(this.quiz);
      
    },(error)=>{
      console.log(error);
      
    });

    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
    }, (error)=>{
      alert("Error in loading the data");
    })
  }
  updateQuiz()
  {
    if(this.quiz.title.trim()=='' || this.quiz.title==null)
    {
      this.snack.open("Title Requires !!",'',{duration:3000});
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire("Updated !!","Quiz is updated",'success').then((e)=>{
        this.router.navigate(['admin/quizzes'])
      })
    },(error)=>{
      Swal.fire("Error!!","Error in updating","error");
    })
  }

}
