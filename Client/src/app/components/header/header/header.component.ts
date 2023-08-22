import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LoginPopUpComponent } from 'src/app/pages/landingpage/login-pop-up/login-pop-up.component';
import {Router} from "@angular/router";
import { DateAdapter } from '@angular/material/core';
import { images } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() public emitAction: EventEmitter<any> = new  EventEmitter<any>()

  navImg: string = `${images}/nav-menu.svg`

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

  public navMenuToggle() {
    this.emitAction.emit()
  }
}
