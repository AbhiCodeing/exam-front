import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId;
  questions;
  
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  constructor(private locationSt:LocationStrategy, private route:ActivatedRoute, private questionService:QuestionService,
    private router:Router) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this.route.snapshot.params['qId'];
    console.log(this.qId);
    this.loadQuestions();
    
  
  }

  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'', location.href)
    });
  }

  loadQuestions()
  {
    this.questionService.getQuestionsOfQuizForTest(this.qId).subscribe((data:any)=>{
      this.questions=data;

      this.timer=this.questions.length*2*60;


      this.questions.forEach((element) => {
        element['givenAnswer']='';
      });
      console.log(this.questions);
      this.startTimer();
      
      
    },(error)=>{
      Swal.fire("Error","Error in loadding Question of Quiz",'error')
    })
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      this.isSubmit=true;
      if (result.isConfirmed)
      {
       this.questions.forEach(q=>{
        if(q.givenAnswer==q.answer)
        {
          this.correctAnswer++;
          let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
          this.marksGot +=marksSingle;
        }
        if(q.givenAnswer.trim() !='')
        {
          this.attempted++;
        }
        
        
       });
       console.log("Correct Answers"+this.correctAnswer);
        console.log("Marks Got"+this.marksGot);
        console.log("Attempted"+this.attempted);
        
      }
    })
  }

  startTimer()
  {
    let t=window.setInterval(()=>{
      if(this.timer<=0)
      {
        this.submitQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime()
  {
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60
    return `${mm} min : ${ss} sec`;
  }

  

}
