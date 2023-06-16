import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VALID} from "../../../shared/constants/forms";
import {RegisterPopUpComponent} from "../register-pop-up/register-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import { LoginRegisterService } from '../account.service';
import { AccountLogin } from 'src/app/shared/models/accounts';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SHA256 } from 'crypto-js';

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
    private loginRegisterService: LoginRegisterService,
    private toastrService: ToastrService,
    private route: Router,
    private translate: TranslateService
    ) {
    this.loginUserFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get fUser() { return this.loginUserFormGroup.controls; }

  loginButton(loginUserFormGroup: FormGroup) {
    this.route.navigateByUrl('user-page')
    this.popUp.closeAll();
    if (loginUserFormGroup.status === VALID) {

      let model: AccountLogin = {
        email: this.fUser['name'].value,
        password: SHA256(this.fUser['password'].value).toString(),
        method: "XerionTest",
        token: ""
      };
      
      this.loginRegisterService.Login(model).subscribe(res => {
        console.log(res.errorMessage)    
        if (res.errorMessage === "E-mail jest niepotwierdzony.") {
          this.toastrService.warning(this.translate.instant('Login.E-mail is not verified'));
        }
        if (res.errorMessage === "Konta nie znaleziono.") {
          this.toastrService.error(this.translate.instant('Login.No such account'));
          
        }
      });
    }
  }

  openRegister() {
    this.popUp.closeAll();
    this.popUp.open(RegisterPopUpComponent);
  }
}
