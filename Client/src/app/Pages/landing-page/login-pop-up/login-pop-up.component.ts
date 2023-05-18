import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VALID} from "../../../shared/constants/forms";
import {RegisterPopUpComponent} from "../register-pop-up/register-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import { LoginService } from './login.service';
import { AccountLogin } from 'src/app/shared/models/accounts';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private loginService: LoginService,
    private toastrService: ToastrService,
    private route: Router
    ) {
    this.loginUserFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get fUser() { return this.loginUserFormGroup.controls; }

  loginButton(loginUserFormGroup: FormGroup) {
    if (loginUserFormGroup.status === VALID) {

      let model: AccountLogin = {
        email: this.fUser['name'].value,
        password: this.fUser['password'].value,
        method: "XerionTest",
        token: ""
      };

      this.loginService.Login(model).subscribe(res => {
        console.log(res.errorMessage)
        if (res.errorMessage === "E-mail jest niepotwierdzony.") {
          this.toastrService.warning('E-mail is not confirmed');
        }
        if (res.errorMessage === "Konta nie znaleziono.") {
          this.toastrService.error('No such account');
          this.popUp.closeAll();
          this.route.navigateByUrl('homepage')
        }
      });
    }
  }

  openRegister() {
    this.popUp.closeAll();
    this.popUp.open(RegisterPopUpComponent);
  }
}
