import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute, private quizService:QuizServiceService) { }
  catId;
  quizzes;

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      this.catId=this.route.snapshot.params['catId'];

      if(this.catId==0)
      {
        console.log("load all the quiz");
        this.quizService.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
          
        },(error)=>{
          alert("error in loading all quizzes")
          
        })
  
        
      }
      else{
        console.log("Load specfic quiz");
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes=data;
        },(error)=>{
          alert("Error in loading Quiz data");
        })
        
      }
    });
  }

}
