import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-instructions',
  templateUrl: './pre-instructions.component.html',
  styleUrls: ['./pre-instructions.component.css']
})
export class PreInstructionsComponent implements OnInit {

  qId;
  quiz;

  constructor(private route:ActivatedRoute, private quizService:QuizServiceService, private router:Router) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qId'];
    //console.log(this.qId);

    this.quizService.getSingleQuiz(this.qId).subscribe((data:any)=>{
      //console.log(data);
      this.quiz=data;
      console.log(this.quiz);
      
      
    },(error:any)=>{
      console.log(error);
      alert("Error in loading Quiz data");
      
    })
  }
  startQuiz()
  {
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
