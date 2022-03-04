import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
{
  path:'signup',
  component: SignupComponent,
  pathMatch: 'full',
},
{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full',
},
{
  path:'admin',
  component:DashboardComponent,
  canActivate:[AdminGuard],
  //if canActivate returns true then only we can access things that we did in canActivate method
  
  children:[

    {
      path:'',
      component: WelcomeComponent,
    },
    {
      path:'profile',
      component: ProfileComponent,
    },
    {
      path:'categories',
      component: ViewCategoriesComponent ,
    },
    {
      path:'add-category',
      component: AddCategoryComponent,

    },
    {
      path:'view-quizzes',
      component:ViewQuizzesComponent,
    },
    {
      path:'add-quiz',
      component:AddQuizComponent,
   },
   {
      path:'quiz/:qid',
      component:UpdateQuizComponent,
   },
   {
      path:'view-questions/:qid/:title',
      component:ViewQuizQuestionComponent,
   },
   {
      path:'add-question/:qid/:title',
      component:AddQuestionComponent,
   },
  
  ]
 

},
{
  path:'start/:qid',
  component:StartComponent,
  canActivate:[NormalGuard],
},
{
  path:'user-dashboard',
  component:UserDashboardComponent,
 
  canActivate:[NormalGuard],
  children:[
    {
      path:':catId',
      component:LoadQuizComponent,
    },
    {
      path:'instructions/:qid',
      component: InstructionsComponent,
    },
    
  ]
},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
