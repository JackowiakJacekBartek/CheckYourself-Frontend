import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoginPopUpComponent } from 'src/app/pages/landingpage/login-pop-up/login-pop-up.component';
import {Router} from "@angular/router";
import { DateAdapter } from '@angular/material/core';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() public userID;

  @Output() public emitAction: EventEmitter<any> = new  EventEmitter<any>()

  navImg: string = `${icons}/nav-menu.svg`
  localStorage = localStorage;

  constructor(
    private popUp: MatDialog,
    private translate: TranslateService,
    private router: Router,
    private dateAdapter: DateAdapter<any>
    ) { }

  openLogin() {
    if(localStorage.getItem('userID') && localStorage.getItem('userID') !== "undefined") {
      this.router.navigate(['/user/'+localStorage.getItem('userID')]);
    }
    else {
      this.popUp.open(LoginPopUpComponent);
    }
  }

  openCompany() {
    this.router.navigate(['/company/']);
  }

  goBack () {
    this.router.navigate(['/']);
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

  public navMenuToggle() {
    this.emitAction.emit()
  }
}
