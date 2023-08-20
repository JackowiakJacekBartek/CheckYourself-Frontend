import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./pages/landingpage/landing-page.component";
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UserPageComponent } from "./pages/userpage/user-page.component";
import {CompanyPageComponent} from "./pages/companypage/company-page.component";
import { EditUserProfileComponent } from './pages/edit-userpage/edit-user-profile/edit-user-profile/edit-user-profile.component';
import { QuizSolveComponent } from './pages/quizes/quiz-solve/quiz-solve.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import {EditCompanyPageComponent} from "./pages/edit-companypage/edit-company-page.component";
import {JoboffersComponent} from "./pages/joboffers/joboffers.component";
import {EditJoboffersComponent} from "./pages/edit-joboffers/edit-joboffers.component";

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
  },
  {
    path: 'homepage', component: HomepageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'userpage', component: UserPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'edit-userpage', component: EditUserProfileComponent, canActivate:[AuthGuard]
  },
  {
    path: 'companypage', component: CompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'edit-companypage', component: EditCompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'email-verification/:email/:code', component: EmailVerificationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz', component: QuizSolveComponent, canActivate:[AuthGuard]
  },
  {
    path: 'joboffers', component: JoboffersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'edit-joboffers', component: EditJoboffersComponent, canActivate:[AuthGuard]
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
