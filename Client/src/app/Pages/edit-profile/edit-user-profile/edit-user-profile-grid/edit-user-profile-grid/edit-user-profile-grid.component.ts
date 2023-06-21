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

adressOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

constructor(private ref: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("bup")
    console.log(this.data?.account.email)
    if(!this.data) return;

    this.form.setValue({
      email: this.data.account.email ? this.data.account.email : '',
      adress: 'Borowo 21',
      phone: this.data.account.phoneNumber ? this.data?.account.phoneNumber : '000-000-000',
      salaryMin: 25,
      salaryMax: 50,
      dateOfBirth: this.data.account.birthDate ? this.data.account.birthDate : new Date('03-10-1999'),
      workingTime: 'Pełen Etat',
      gitHub: 'git',
      linkedIn: 'linked',
      site: 'strona',
    })

  }

  ngOnInit(): void {
    // this.gridData = this.data;
    
  }

}
