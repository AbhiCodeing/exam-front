import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any;

  constructor(private quiz:QuizServiceService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
      
    },(error)=>{
      Swal.fire("Error!!","Error in loading data",'error');
    })
  }
  deleteQuiz(qId:any)
  {
    Swal.fire({icon:'warning','title':"Are you sure ?",confirmButtonText:'Delete',showCancelButton:true})
    .then((result)=>{
      if(result.isConfirmed)
      {
        this.quiz.deleteQuiz(qId).subscribe((data:any)=>{
          this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=qId);
          Swal.fire('Success',"Quiz Deleted",'success');
        }, (error)=>{
          Swal.fire('Error !!',"Error in deleteing quiz",'error');
        })
      }
    })
  }
}