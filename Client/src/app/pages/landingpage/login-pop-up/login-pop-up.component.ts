import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VALID} from "../../../shared/constants/forms";
import {RegisterPopUpComponent} from "../register-pop-up/register-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import { AccountLogin } from 'src/app/shared/models/accounts';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SHA256 } from 'crypto-js';
import { AccountService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})
export class LoginPopUpComponent {

  loginUserFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private popUp: MatDialog,
    private toastrService: ToastrService,
    private route: Router,
    private translate: TranslateService,
    private accountService: AccountService
    ) {
    this.loginUserFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      token: ['', []],
    });
  }

  get fUser() { return this.loginUserFormGroup.controls; }

  loginButton(loginUserFormGroup: FormGroup) {
    if (loginUserFormGroup.status === VALID) {

      let model: AccountLogin = {
        email: this.fUser['email'].value,
        password: SHA256(this.fUser['password'].value).toString(),
        method: "XerionTest",
        token: ""
      };

      this.accountService.login(model).subscribe(res => {
        if (res.errorMessage === "E-mail jest niepotwierdzony.") {
          this.toastrService.warning(this.translate.instant('Login.E-mail is not verified'));
        }
        if (res.errorMessage === "Konta nie znaleziono.") {
          this.toastrService.error(this.translate.instant('Konta nie znaleziono'));
        }
        if (res.errorMessage === "Jesteś atakowany") {
          this.toastrService.error(this.translate.instant('zle hrwegaslo'));
        }
        if (res.errorMessage === "Sukces.") {
          this.toastrService.success(this.translate.instant('Login.Successfully logged in'));
          this.popUp.closeAll();
        }

      });
    }
  }

  openRegister() {
    this.popUp.closeAll();
    this.popUp.open(RegisterPopUpComponent);
  }
}
