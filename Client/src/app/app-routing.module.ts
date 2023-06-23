import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./Pages/landing-page/landing-page.component";
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UserPageComponent } from "./Pages/user-page/user-page.component";
import {CompanyPageComponent} from "./Pages/company-page/company-page.component";
import { EditUserProfileComponent } from './Pages/edit-profile/edit-user-profile/edit-user-profile/edit-user-profile.component';
import { EmailVerificationComponent } from './Pages/email-verification/email-verification.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
  },
  {
    path: 'homepage', component: HomepageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user-page', component: UserPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'edit-userpage', component: EditUserProfileComponent, canActivate:[AuthGuard]
  },
  {
    path: 'company-page', component: CompanyPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'email-verification/:email/:code', component: EmailVerificationComponent, canActivate:[AuthGuard]
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
