import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterPopUpComponent} from "./register-pop-up/register-pop-up.component";
import {TranslateService} from "@ngx-translate/core";
import {LoginPopUpComponent} from "./login-pop-up/login-pop-up.component";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(public popUp: MatDialog, private translate: TranslateService) {
  }

  openRegister() {
    this.popUp.open(RegisterPopUpComponent);
  }

  openLogin() {
    this.popUp.open(LoginPopUpComponent);
  }

  public changeLanguage() {
    if (this.translate.currentLang == "pl") {
      this.translate.use('en');
    } else {
      this.translate.use('pl');
    }
  }
}
