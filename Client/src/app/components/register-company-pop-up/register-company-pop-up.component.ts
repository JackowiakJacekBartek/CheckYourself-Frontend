import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { INVALID, PASSWORD_LENGHT, VALID } from 'src/app/shared/constants/forms';
// import {LoginPopUpComponent} from "../login-pop-up/login-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {AccountRegister, CompanyRegister} from 'src/app/shared/models/accounts';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SHA256 } from 'crypto-js';
import {ActivatedRoute, Router} from '@angular/router';
import { AccountService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-register-company-pop-up',
  templateUrl: './register-company-pop-up.component.html',
  styleUrls: ['./register-company-pop-up.component.scss']
})

export class RegisterCompanyPopUpComponent implements OnDestroy {

  labelPosition = "user";
  // registerUserFormGroup: FormGroup;
  public registerCompanyFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private popUp: MatDialog,
    private route2: ActivatedRoute,
    private accountService: AccountService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private route: Router
    ) {
    // this.registerUserFormGroup = this._formBuilder.group({
    //   name: ['', [Validators.required, this.noSpaceAllowed]],
    //   surname: ['', [Validators.required, this.noSpaceAllowed]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    //   confirmPassword: ['', Validators.required],
    //   privacyCheckbox: ['', Validators.requiredTrue],
    // }, {validators: this.mustMatch('password', 'confirmPassword')});

    this.registerCompanyFormGroup = this._formBuilder.group({
      nameCompany: ['', [Validators.required, this.noSpaceAllowed]],
      nip: ['', [Validators.required, this.numeric]],
      headquarterAddress: ['', [Validators.required]],
      //password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required],
      privacyCheckbox: ['', Validators.requiredTrue],
    });
  }

  ngOnDestroy(): void {
    this._snackBar.dismiss();
  }

  // get fUser() { return this.registerUserFormGroup.controls; }
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

  registerMessages(res : any) {
    if (res.errorMessage === "Potwierdź proszę rejestrację swojego konta Check Yourself.") {
      this.toastrService.warning(this.translate.instant('Login.E-mail is not verified'));
    }
    if (res.errorMessage === "Konto istnieje.") {
      this.toastrService.warning(this.translate.instant('Login.Account exists'));
    }
    if(res.errorCode == 1) {
      this.toastrService.success(this.translate.instant('Login.Registered successfully'))
    }
    if(res.errorCode == 3) {
      this.toastrService.success(this.translate.instant('Login.Successfully logged in'))
      this.popUp.closeAll();
    }

  }

  registerButton(formGroup: FormGroup) {
    if (formGroup.get('privacyCheckbox')?.status == INVALID) {
      console.log('Polityka niezaznaczona');
      this.openSnackBar('Uwaga! W celu rejestracji należy zaakceptować regulamin wraz z polityką ochrony danych osobowych.');
    } else if (formGroup.status === VALID) {

      // let model: AccountRegister = {
      //   firstname: this.fUser['name'].value,
      //   lastname: this.fUser['surname'].value,
      //   email: this.fUser['email'].value,
      //   password: SHA256(this.fUser['password'].value).toString()
      // };

      // this.accountService.register(model).subscribe(res => {
      //   console.log(res.errorMessage)
      //   console.log(res)
      //   this.registerMessages(res);
      // });
    }
    else {
      console.log('Invalid na formularzu');
    }
  }

  registerButtonCompany(formGroup: FormGroup) {
    if (formGroup.get('privacyCheckbox')?.status == INVALID) {
      console.log('Polityka niezaznaczona');
      this.openSnackBar('Uwaga! W celu rejestracji należy zaakceptować regulamin wraz z polityką ochrony danych osobowych.');
    } else if (formGroup.status === VALID) {

      let companyModel: CompanyRegister = {
        nip: this.fCompany['nip'].value,
        name: this.fCompany['nameCompany'].value,
        headquarterAddress: this.fCompany['headquarterAddress'].value,
        idAccount: Number(localStorage.getItem('userID'))
      };

      this.accountService.CompanyRegister(companyModel).subscribe(res => {
        console.log('warto', res)
        console.log('warto', companyModel)
        this.registerMessages(res);
      });
    }
    else {
      console.log('Invalid na formularzu');
    }
  }

  success() {
    this.toastrService.success('Message Success!', 'Title Success!');
  }


  getErrorPassword(pass: number) {
    let passwordLength = PASSWORD_LENGHT - pass;
    // if (this.registerUserFormGroup.get('password')?.hasError('minlength')) {
    //   return 'Brakuje ' + passwordLength + ' znaków';
    // }
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
    // if (this.registerUserFormGroup.get('privacyCheckbox')?.status == 'VALID') {
    //   this._snackBar.dismiss();
    // }
  }

  openLogin() {
    this.popUp.closeAll();
    // this.popUp.open(LoginPopUpComponent);
  }
}
