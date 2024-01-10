import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterPopUpComponent} from "./register-pop-up/register-pop-up.component";
import {TranslateService} from "@ngx-translate/core";
import {LoginPopUpComponent} from "./login-pop-up/login-pop-up.component";
import {ActivatedRoute} from "@angular/router";
import { EmailVerificationService } from './landing-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private toastrService: ToastrService, private route: ActivatedRoute, private emailVerificationService: EmailVerificationService, 
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
        this.toastrService.warning("Nie udało się zweryfikować adresu e-mail");
      } else {
        this.toastrService.success(res.methodResult.email + " został zweryfikowany");
      }
    },
    error => {
      this.toastrService.warning("Nie udało się zweryfikować adresu e-mail");
    })
    
  }

  localStorage = localStorage;

  openRegister() {
    this.popUp.open(RegisterPopUpComponent);
  }
}

export interface EmailVerification {
  email: string,
  code: number
}