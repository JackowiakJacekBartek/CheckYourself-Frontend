import {HomepageComponent} from './pages/homepage/homepage.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './pages/landingpage/landing-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RegisterPopUpComponent} from './pages/landingpage/register-pop-up/register-pop-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoginPopUpComponent } from './pages/landingpage/login-pop-up/login-pop-up.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { UserPageComponent } from "./pages/userpage/user-page.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BasicInterceptorInterceptor} from "./shared/helpers/interceptors/basic-interceptor.interceptor";
import { CompanyPageComponent } from './pages/companypage/company-page.component';
import { EditUserProfileComponent } from './pages/edit-userpage/edit-user-profile/edit-user-profile/edit-user-profile.component';
import { MatSelectModule } from '@angular/material/select';
import { EditUserProfileGridComponent } from './pages/edit-userpage/edit-user-profile/edit-user-profile-grid/edit-user-profile-grid/edit-user-profile-grid.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { QuizCreatComponent } from './pages/quizes/quiz-creat/quiz-creat.component';
import { QuizSolveComponent } from './pages/quizes/quiz-solve/quiz-solve.component';
import { MultiChoiceQuestionComponent } from './pages/quizes/quiz-solve/multi-choice-question/multi-choice-question.component';
import { CompleteSentenceQuestionComponent } from './pages/quizes/quiz-solve/complete-sentence-question/complete-sentence-question.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { EditCompanyPageComponent } from './pages/edit-companypage/edit-company-page.component';
import { JoboffersComponent } from './pages/joboffers/joboffers.component';
import { EditJoboffersComponent } from './pages/edit-joboffers/edit-joboffers.component';

@NgModule({
  exports: [
    MatSnackBarModule,
  ],
  declarations: [
    AppComponent,
    HomepageComponent,
    AppComponent,
    LandingPageComponent,
    RegisterPopUpComponent,
    LoginPopUpComponent,
    HeaderComponent,
    FooterComponent,
    UserPageComponent,
    CompanyPageComponent,
    EditUserProfileComponent,
    EditUserProfileGridComponent,
    QuizCreatComponent,
    QuizSolveComponent,
    MultiChoiceQuestionComponent,
    CompleteSentenceQuestionComponent,
    EmailVerificationComponent,
    EditCompanyPageComponent,
    JoboffersComponent,
    EditJoboffersComponent
  ],
  imports: [
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    MatProgressBarModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
