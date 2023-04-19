import {Component, OnDestroy} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-pop-up',
  templateUrl: './register-pop-up.component.html',
  styleUrls: ['./register-pop-up.component.scss']
})

export class RegisterPopUpComponent implements OnDestroy {

  labelPosition = "user";
  registerUserFormGroup: FormGroup;
  registerCompanyFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
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
    if (formGroup.get('privacyCheckbox')?.status == 'INVALID') {
      console.log('Polityka nie zaznaczona');
      this.openSnackBar('Uwaga! W celu rejestracji należy zaakceptować regulamin wraz z polityką ochrony danych osobowych.');
    } else if (formGroup.status == "VALID")
      console.log(formGroup);
    else
      console.log('Invalid na formularzu');
  }

  getErrorPassword(pass: number) {
    let passwordLength = 8 - pass;
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
}
