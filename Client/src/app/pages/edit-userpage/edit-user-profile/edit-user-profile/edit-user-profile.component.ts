import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditUserProfileService } from '../edit-user-profile.service';
import { UserProfile } from 'src/app/shared/models/accounts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnChanges, AfterViewInit, OnInit {
  rangeExp = new FormGroup({
    datestart: new FormControl<Date | null>(null),
    dateend: new FormControl<Date | null>(null),
  });

  rangeEdu = new FormGroup({
    datestart: new FormControl<Date | null>(null),
    dateend: new FormControl<Date | null>(null),
  });

  selectedLang1 = 'one';
  selectedLangLvL1 = 'one';
  selectedLang2 = 'one';
  selectedLangLvL2 = 'one';
  selectedTitle = 'one';

  languages = [
    {
      id: 1,
      language: 'Polski',
      skill: 100
    },
    {
      id: 2,
      language: 'Angielski',
      skill: 80
    },
  ];

  data!: UserProfile;
  private phonePattern = /^\d{3}-\d{3}-\d{3}$|^\d{3}\d{3}\d{3}$/; // accepts either 000-000-000 or 000000000 patterns

  public userProfileEditForm!: FormGroup;

  public userProfileEditGridForm: FormGroup = this.formBuilder.group({
    adress: ['', [Validators.required]],
    phone: ['', [Validators.pattern(this.phonePattern)]],
    salarymin: [3000, [Validators.required]],
    salarymax: [15000, [Validators.required]],
    email: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    workingTime: ['', [Validators.required]],
    gitHub: ['', [Validators.required]],
    linkedIn: ['', [Validators.required]],
    site: ['', [Validators.required]],
  });

  public currentUserID: number = +this.route.snapshot.params['id'];
  public returnLink: string = `/userpage/${this.currentUserID}`

  constructor(
    private ref: ChangeDetectorRef,
    private editUserProfileService: EditUserProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    !(this.currentUserID === +localStorage.getItem('userID')!) && this.router.navigate([`/userpage/${localStorage.getItem('userID')}`]); //if user tries to change ID in url
    
    this.userProfileEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      aboutMe: ['', []],
      languages: [[], []],
      education: this.formBuilder.array([]),
      experience: this.formBuilder.array([]),
      certificates: this.formBuilder.array([]),
      organizationsAndSkills: this.formBuilder.array([]),
    });
  }

  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.editUserProfileService.getUserById(this.currentUserID).subscribe(res => {
      this.data = res.methodResult;
      // console.log(this.data)
      if(!this.data) return;
      this.userProfileEditForm.setValue({
        name: this.data.account.name,
        surname: this.data.account.surname,
        position: this.data.account.position ? this.data.account.position : '',
        aboutMe: this.data.account.description,
        languages: this.languages,
        education: this.data.accountEducationModelDto,
        experience: this.data.accountWorkExperiences,
        certificates: this.data.accountCoursesCertificates,
        organizationsAndSkills: this.data.accountSoftSkills ? this.data.accountSoftSkills : []
      });
    })
    this.ref.detectChanges();

  }

  ngOnChanges(changes: SimpleChanges): void { }

  keepOrder = (a: any, b: any) => {
    return a;
  };

  updateColor(progress: any) {
    if (progress < 50) {
      return 'warn';
    } else if (progress < 80) {
      return 'accent';
    } else {
      return 'primary';
    }
  }

  hasDropdown(input: string) {
    switch (input) {
      case 'Adres':
      case 'Widełki':
      case 'Strona':
      case 'Etat':
        return true;

      default:
        return false;
    }
  }

  getSkillLevel(value: number) {
    if (value === 100) return 'Native/C2';
    if (value < 100 && value >= 80) return 'C1';
    if (value === 0) return '';
    return 'Error';
  }

  public removeAtIndex(formControl: string, index: number) {
    switch (formControl) { 
      case 'experience':
        return this.experience.removeAt(index);
      case 'certificates':
        return this.certificates.removeAt(index);
      case 'education':
        return this.education.removeAt(index)
    }
  }

  addLang() {
    this.languages.push({
      id: 999,
      language: '',
      skill: 0,
    });
  }

  public createTask(): FormGroup {
    return this.formBuilder.group({
      taskName: ['', Validators.required]
    });
  }

  getTasks(item: AbstractControl): FormArray {
    return item.get('tasks') as FormArray;
  }

  addTask(item) {
    // console.log(item.getRawValue().accountworkresponsibilities)
    // item.controls.accountworkresponsibilities.controls.push(this.formBuilder.group({
    //   name: ['', []]
    // }))
    console.log("Temporary disabled")
  }

  public get experience() {
    return this.userProfileEditForm.get('experience') as FormArray;
  }

  public addExp() {
    this.experience.push(this.formBuilder.group({
      workcompany: ['', []],
      datestart: new FormControl<Date | null>(null),
      dateend: new FormControl<Date | null>(null),
      accountworkresponsibilities: this.formBuilder.group({
          name: ['', []]
        })
    }));
    this.ref.detectChanges();
  }

  public get education() {
    return this.userProfileEditForm.get('education') as FormArray;
  }

  addEdu() {
    this.education.push(this.formBuilder.group({
      professionname: ['', []],
      universityname: ['', []],
      professionaltitle: ['', []],
      datestart: new FormControl<Date | null>(null),
      dateend: new FormControl<Date | null>(null),
    }));
    this.ref.detectChanges();
  }

  public get certificates() {
    return this.userProfileEditForm.get('certificates') as FormArray;
  }

  addCert() {
    this.certificates.push(this.formBuilder.group({
        certificatename: ['', []],
        organizationissuingcertificate: ['', []],
        certificatenumber: ['', []],
        certificateissuedate: ['', []]
    }));
  }

  public get organizationsAndSkills() {
    return this.userProfileEditForm.get('organizationsAndSkills') as FormArray;
  }

  addNew(softSkillType: number) {
    switch (softSkillType) {
      case 1:
        this.organizationsAndSkills.push(this.formBuilder.group({
          idaccountsoftskillstitle: [1, []],
          name: ['',[]]
        }));
        break;
      case 2:
        this.organizationsAndSkills.push(this.formBuilder.group({
          idaccountsoftskillstitle: [2, []],
          name: ['',[]]
        }));
        break;
      case 3:
        this.organizationsAndSkills.push(this.formBuilder.group({
          idaccountsoftskillstitle: [3, []],
          name: ['',[]]
        }));
        break;
    }
  }

  public deletePositionByID(index: object, arrayType: object[]): void {
    arrayType.splice(arrayType.indexOf(index), 1);
  }


  private accountDetails() {
    return (
      this.data.account.name = this.userProfileEditForm.value.name,
      this.data.account.surname = this.userProfileEditForm.value.surname,
      this.data.account.description = this.userProfileEditForm.value.aboutMe,
      this.data.account.image = '',
      this.data.account.birthdate = this.userProfileEditGridForm.value.dateOfBirth,
      this.data.account.email = this.userProfileEditGridForm.value.email,
      this.data.account.phonenumber = this.userProfileEditGridForm.value.phone,
      this.data.account.salarymax = this.userProfileEditGridForm.value.salarymax,
      this.data.account.salarymin = this.userProfileEditGridForm.value.salarymin
    )
  }

  public save() {
    this.accountDetails();
    this.data.accountCoursesCertificates = this.userProfileEditForm.value.certificates;
    this.data.accountWorkExperiences = this.userProfileEditForm.value.experience;
    this.data.accountEducationModelDto = this.userProfileEditForm.value.education;
    this.data.accountSoftSkills = this.userProfileEditForm.value.organizationsAndSkills;
    // console.log(this.userProfileEditForm.value)
    // console.log(this.userProfileEditForm.value.certificates)
    // console.log(this.userProfileEditGridForm.value)
    // console.log(this.data.accountWorkExperiences)
    // console.log(this.data)
    // console.log(JSON.stringify(this.data))
    this.editUserProfileService.updateUserById(this.data.account.id, this.data).subscribe();
  }
}
