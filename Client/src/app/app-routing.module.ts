import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./pages/landingpage/landing-page.component";
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UserPageComponent } from "./pages/userpage/user-page.component";
import {CompanyPageComponent} from "./pages/companypage/company-page.component";
import { EditUserProfileComponent } from './pages/edit-userpage/edit-user-profile/edit-user-profile/edit-user-profile.component';
import {EditCompanyPageComponent} from "./pages/edit-companypage/edit-company-page.component";
import {ListjoboffersComponent} from "./pages/listjoboffers/listjoboffers.component";
import { CompaniesPageComponent } from './pages/companiespage/companies-page.component';
import {EditJobofferComponent} from "./pages/edit-joboffer/edit-joboffer.component";
import { QuizCreateComponent } from './pages/quizes/quiz-create/quiz-create.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { ResultComponent } from './pages/quizzes/result/result.component';
import {JobofferComponent} from "./pages/joboffer/joboffer.component";
import { QuizzesListComponent } from './pages/quizzes-list-component/quizzes-list-component.component';
import { JobOfferAppliesComponent } from './pages/job-offer-applies/job-offer-applies.component';
import { TermsComponent } from './pages/terms/terms.component';

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
    path: 'quizzes', component: QuizzesListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffer/:id/quiz', component: QuizzesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz/result/:id', component: ResultComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffer/:id/applies', component: JobOfferAppliesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz/create', component: QuizCreateComponent, canActivate:[AuthGuard]
  },
  {
    path: 'create-joboffer', component: EditJobofferComponent, canActivate:[AuthGuard]
  },
  {
    path: 'listjoboffers', component: ListjoboffersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffer/:id', component: JobofferComponent
  },
  {
    path: 'joboffer/:id/create-quiz', component: QuizCreateComponent, canActivate:[AuthGuard]
  },
  {
    path: 'terms', component: TermsComponent
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
