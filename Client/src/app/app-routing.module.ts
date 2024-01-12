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
import {EditJoboffersComponent} from "./pages/edit-joboffers/edit-joboffers.component";
import {ListjoboffersComponent} from "./pages/listjoboffers/listjoboffers.component";
import { CompaniesPageComponent } from './pages/companiespage/companies-page.component';
import { QuizCreatComponent } from './pages/quizes/quiz-creat/quiz-creat.component';

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
    path: 'company/:id', component: CompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'company/:id/edit', component: EditCompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'email-verification/:email/:code', component: LandingPageComponent
  },
  {
    path: 'quiz', component: QuizSolveComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz/create', component: QuizCreatComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffers', component: JoboffersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'edit-joboffers', component: EditJoboffersComponent, canActivate:[AuthGuard]
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
