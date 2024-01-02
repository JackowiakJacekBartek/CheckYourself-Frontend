import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/shared/models/accounts';

@Component({
  selector: 'app-edit-user-profile-grid',
  templateUrl: './edit-user-profile-grid.component.html',
  styleUrls: ['./edit-user-profile-grid.component.scss']
})
export class EditUserProfileGridComponent implements OnInit, OnChanges, AfterViewInit {

@Input() form!: FormGroup;
@Input() data!: UserProfile;

public phoneMask = [/[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/, /[1-9]/];

constructor(private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.data) return;
    this.form.setValue({
      email: this.data?.account.email ? this.data.account.email : 'no email',
      adress: '',
      phone: this.data?.account.phonenumber ? this.data?.account.phonenumber : '',
      salarymin: this.data?.account.salarymin ? this.data?.account.salarymin : 3000,
      salarymax: this.data?.account.salarymax ? this.data?.account.salarymax : 15000,
      dateOfBirth: this.data?.account.birthdate ? new Date(this.data.account.birthdate) : '',
      workingTime: '',
      gitHub: '',
      linkedIn: '',
      site: '',
    })
  }

  ngOnInit(): void {
    // this.gridData = this.data;

  }

}
