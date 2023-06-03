import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./Pages/landing-page/landing-page.component";
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { AuthGuard } from './shared/helpers/guards/auth.guard';
import { UserPageComponent } from "./Pages/user-page/user-page.component";

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
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
