import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoginPopUpComponent } from 'src/app/Pages/landing-page/login-pop-up/login-pop-up.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private popUp: MatDialog,
    private translate: TranslateService,
    private router: Router
    ) { }

  openLogin() {
    this.popUp.open(LoginPopUpComponent);
  }

  goBack () {
    this.router.navigate(['']);
  }

  public changeLanguage() {
    if (this.translate.currentLang == "pl") {
      this.translate.use('en');
      localStorage.setItem('selectedLanguage', 'en');
    } else {
      this.translate.use('pl');
      localStorage.setItem('selectedLanguage', 'pl');
    }
  }
}
