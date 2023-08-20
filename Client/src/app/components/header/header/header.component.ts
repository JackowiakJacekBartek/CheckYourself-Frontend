import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoginPopUpComponent } from 'src/app/pages/landingpage/login-pop-up/login-pop-up.component';
import {Router} from "@angular/router";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private popUp: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private dateAdapter: DateAdapter<any>
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
    this.dateAdapter.setLocale(localStorage.getItem('selectedLanguage'));
  }
}
