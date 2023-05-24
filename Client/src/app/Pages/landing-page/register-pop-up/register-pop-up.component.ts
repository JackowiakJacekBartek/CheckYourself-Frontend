import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { INVALID, PASSWORD_LENGHT, VALID } from 'src/app/shared/constants/forms';
import {LoginPopUpComponent} from "../login-pop-up/login-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import { LoginService } from '../account.service';
import { AccountRegister } from 'src/app/shared/models/accounts';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.scss']
})

export class RegisterPopUpComponent implements OnDestroy {

  labelPosition = "user";
  registerUserFormGroup: FormGroup;
  registerCompanyFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar, 
    private popUp: MatDialog,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private translate: TranslateService
    ) {
    this.registerUserFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, this.noSpaceAllowed]],
      surname: ['', [Validators.required, this.noSpaceAllowed]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      privacyCheckbox: ['', Validators.requiredTrue],
    }, {validators: this.mustMatch('password', 'confirmPassword')});

    this.registerCompanyFormGroup = this._formBuilder.group({
      nameCompany: ['', [Validators.required, this.noSpaceAllowed]],
      nip: ['', [Validators.required, this.numeric]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      privacyCheckbox: ['', Validators.requiredTrue],
    }, {validators: this.mustMatch('password', 'confirmPassword')});
  }

  ngOnDestroy(): void {
    this._snackBar.dismiss();
  }

  get fUser() { return this.registerUserFormGroup.controls; }
  get fCompany() { return this.registerCompanyFormGroup.controls; }

  mustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({mustMatch: true})
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  registerButton(formGroup: FormGroup) {
    if (formGroup.get('privacyCheckbox')?.status == INVALID) {
      console.log('Polityka niezaznaczona');
      this.openSnackBar('Uwaga! W celu rejestracji należy zaakceptować regulamin wraz z polityką ochrony danych osobowych.');
    } else if (formGroup.status === VALID) {
      const salt = bcrypt.genSaltSync(10);

      let model: AccountRegister = {
        firstname: this.fUser['name'].value,
        lastname: this.fUser['surname'].value,
        email: this.fUser['email'].value,
        password: bcrypt.hashSync(this.fUser['password'].value, salt)
      };

      this.loginService.Register(model).subscribe(res => {
        console.log(res.errorMessage)
        if(res.isSuccess) {
          this.toastrService.success(this.translate.instant('Login.Registered successfully'))
        }
      });
    }
    else
      console.log('Invalid na formularzu');
  }

  success() {
    this.toastrService.success('Message Success!', 'Title Success!');
  }


  getErrorPassword(pass: number) {
    let passwordLength = PASSWORD_LENGHT - pass;
    if (this.registerUserFormGroup.get('password')?.hasError('minlength')) {
      return 'Brakuje ' + passwordLength + ' znaków';
    }
    return false;
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }
    return false;
  }

  numeric(control: FormControl) {
    let val = control.value;

    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return {'invalidNumber': true};

    return null;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  closeSnackBar() {
    if (this.registerUserFormGroup.get('privacyCheckbox')?.status == 'VALID') {
      this._snackBar.dismiss();
    }
  }

  openLogin() {
    this.popUp.closeAll();
    this.popUp.open(LoginPopUpComponent);
  }
}
