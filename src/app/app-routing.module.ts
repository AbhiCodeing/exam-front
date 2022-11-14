import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { AddQuizComponent } from './pages/add-quiz/add-quiz.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { HomeComponent } from './pages/home/home.component';
import { LoadQuizComponent } from './pages/load-quiz/load-quiz.component';
import { LoginComponent } from './pages/login/login.component';
import { PreInstructionsComponent } from './pages/pre-instructions/pre-instructions.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StartComponent } from './pages/start/start.component';
import { UpdateQuizComponent } from './pages/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {path:"signup",component: SignupComponent, pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'admin',component:AdminComponent,
  canActivate:[AdminGuard],children:[{path:'',component:WelcomeComponent},
  {path:'profile',component:ProfileComponent},{path:'categories',component:ViewCategoriesComponent},{path:'add-category',component:AddCategoryComponent},{
    path:'quizzes',component:ViewQuizzesComponent
  },{path:'add-quiz',component:AddQuizComponent},{path:'quiz/:qid',component:UpdateQuizComponent},{path:'questions/:qid/:title',component:QuestionsComponent},
  {path:'add-question/:qid/:title',component:AddQuestionComponent}]},
  {path:'user',component:DashboardComponent, canActivate:[NormalGuard],children:[{path:':catId',component:LoadQuizComponent},
{path:'instructions/:qId',component:PreInstructionsComponent}]},
{path:'start/:qId',component:StartComponent,canActivate:[NormalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
