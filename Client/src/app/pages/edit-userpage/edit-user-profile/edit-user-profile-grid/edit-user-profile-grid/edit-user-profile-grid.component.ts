import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/shared/models/accounts';
import {CompanySize, JobType} from "../../../../../shared/constants/constants";

@Component({
  selector: 'app-edit-user-profile-grid',
  templateUrl: './edit-user-profile-grid.component.html',
  styleUrls: ['./edit-user-profile-grid.component.scss']
})
export class EditUserProfileGridComponent implements OnInit, OnChanges, AfterViewInit {

@Input() form!: FormGroup;
@Input() data!: UserProfile;

JobType = JobType;

public phoneMask = [/[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/];

constructor(private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
  }

  getTypesWork(): string[] {
    return Object.keys(JobType).filter(key => isNaN(Number(JobType[key])));
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.data) return;
    this.form.setValue({
      // email: this.data?.account.email ?? '',
      adress: this.data?.account.location ?? '',
      phone: this.data?.account.phonenumber ?? '',
      salarymin: this.data?.account.salarymin ? this.data?.account.salarymin : 3000,
      salarymax: this.data?.account.salarymax ? this.data?.account.salarymax : 15000,
      dateOfBirth: this.data?.account.birthdate ? new Date(this.data.account.birthdate) : new Date('2000-01-01'),
      workingTime: this.data?.account.employmentmethod ? this.data?.account.employmentmethod.toString() : '1',
      gitHub: '',
      linkedIn: '',
      site: '',
    })
  }

  ngOnInit(): void {
    // this.gridData = this.data;

  }

  protected readonly CompanySize = CompanySize;
}
