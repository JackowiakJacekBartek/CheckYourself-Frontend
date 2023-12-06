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

public adressOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];


constructor(private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.data) return;
    this.form.setValue({
      email: this.data?.account.email ? this.data.account.email : 'no email',
      adress: '',
      phone: this.data?.account.phonenumber ? this.data?.account.phonenumber : '',
      salarymin: this.data?.account.salarymin,
      salarymax: this.data?.account.salarymax,
      dateOfBirth: this.data?.account.birthdate ? new Date(this.data.account.birthdate) : new Date('03-10-1999'),
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
