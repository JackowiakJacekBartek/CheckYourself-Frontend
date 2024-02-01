import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterPopUpComponent} from "./register-pop-up/register-pop-up.component";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import { EmailVerification, LandingPageService } from './landing-page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  urlParams: EmailVerification = {
    email: '',
    code: 0
  }

  constructor(private toastrService: ToastrService, private route: ActivatedRoute, private emailVerificationService: LandingPageService, 
    public popUp: MatDialog, private translate: TranslateService) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['code'])
    console.log(this.route.snapshot.params['email'])
    this.urlParams.code = Number(this.route.snapshot.params['code']);
    this.urlParams.email = this.route.snapshot.params['email'];
    
    console.log(this.urlParams)

    this.emailVerificationService.verifyEmail(this.urlParams).subscribe(res => {
      console.log(res); 
      if (!res || res.isSuccess == false) {
        this.toastrService.warning(this.translate.instant('LandingPage.Veification failed'));
      } else {
        this.toastrService.success(res.methodResult.email + this.translate.instant('LandingPage.Veification'));
      }
    },
    error => {
      this.toastrService.warning(this.translate.instant('LandingPage.Veification failed'));
    })
    
  }

  localStorage = localStorage;

  openRegister() {
    this.popUp.open(RegisterPopUpComponent);
  }
}
