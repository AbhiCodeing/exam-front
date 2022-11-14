import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any;
  constructor(private route:ActivatedRoute, private questionService:QuestionService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.qTitle=this.route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.qTitle);

    this.questionService.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      this.questions=data;
      console.log(data);
      
    },(error)=>{
      console.log(error);
      
    })
  }
  deleteQuestion(qId:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, You want to delete this question'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.questionService.deleteQuestion(qId).subscribe((data:any)=>{
          this.snack.open("Question deleted Successfily",'',{duration:3000});
          this.questions=this.questions.filter((q:any)=>q.quesId!=qId)
        },(error)=>{
          this.snack.open("Error in deleteing question",'',{duration:3000});
        });
        
      }
    })
  }

}
