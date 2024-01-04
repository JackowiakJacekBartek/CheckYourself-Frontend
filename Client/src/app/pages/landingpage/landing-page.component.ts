import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterPopUpComponent} from "./register-pop-up/register-pop-up.component";
import {TranslateService} from "@ngx-translate/core";
import {LoginPopUpComponent} from "./login-pop-up/login-pop-up.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-landingpage',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(public popUp: MatDialog, private translate: TranslateService, private route: ActivatedRoute) {
  }

  public currentUserID: number = +this.route.snapshot.params['id'];
  public showCompanyButton: boolean = (+this.currentUserID === +localStorage.getItem('userID')!);

  openRegister() {
    this.popUp.open(RegisterPopUpComponent);
  }
}
