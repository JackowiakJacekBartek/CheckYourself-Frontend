import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./pages/landingpage/landing-page.component";
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UserPageComponent } from "./pages/userpage/user-page.component";
import {CompanyPageComponent} from "./pages/companypage/company-page.component";
import { EditUserProfileComponent } from './pages/edit-userpage/edit-user-profile/edit-user-profile/edit-user-profile.component';
import { QuizSolveComponent } from './pages/quizes/quiz-solve/quiz-solve.component';
import {EditCompanyPageComponent} from "./pages/edit-companypage/edit-company-page.component";
import {JoboffersComponent} from "./pages/joboffers/joboffers.component";
import {ListjoboffersComponent} from "./pages/listjoboffers/listjoboffers.component";
import { CompaniesPageComponent } from './pages/companiespage/companies-page.component';
import {EditJobofferComponent} from "./pages/edit-joboffer/edit-joboffer.component";
import { QuizCreatComponent } from './pages/quizes/quiz-creat/quiz-creat.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { ResultComponent } from './pages/quizzes/result/result.component';

const routes: Routes = [
  {
    path: '', component: HomepageComponent,
  },
  {
    path: 'user/:id', component: UserPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user/:id/edit', component: EditUserProfileComponent, canActivate:[AuthGuard]
  },
  {
    path: 'company', component: CompaniesPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'company/:id', component: CompanyPageComponent
  },
  {
    path: 'company/:id/edit', component: EditCompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'email-verification/:email/:code', component: LandingPageComponent
  },
  {
    path: 'quizzes', component: QuizzesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz', component: QuizzesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz/result/:id', component: ResultComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz/create', component: QuizCreatComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffers', component: JoboffersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'create-joboffer', component: EditJobofferComponent, canActivate:[AuthGuard]
  },
  {
    path: 'listjoboffers', component: ListjoboffersComponent, canActivate:[AuthGuard]
  },
  {
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
