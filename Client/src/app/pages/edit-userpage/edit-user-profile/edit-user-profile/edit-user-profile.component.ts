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
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  rangeEdu = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
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

  // education = [
  //   {
  //     name: 'Informatyka',
  //     startTime: '01-01-2019',
  //     endTime: '01-01-2024',
  //     school: 'Uniwersytet im. Adama Mickiewicza',
  //     degree: 'Inżynier'
  //   },
  //   {
  //     name: 'Technik informatyk',
  //     startTime: '01-01-2015',
  //     endTime: '01-01-2019',
  //     school: 'Uniwersytet im. Adama Mickiewicza',
  //     degree: 'Technik'
  //   },
  // ];
  education = [
    {
        name: '',
        startTime: '',
        endTime: '',
        school: '',
        degree: ''
      }
  ];

  data!: UserProfile;
  private phonePattern = /^\d{3}-\d{3}-\d{3}$|^\d{3}\d{3}\d{3}$/; // accepts either 000-000-000 or 000000000 patterns

  public certificate: FormGroup = this.formBuilder.group({
    id: '',
    certificatename: '',
    organizationissuingcertificate: '',
    certificatenumber: '',
    certificateissuedate: ''
  });

  public userProfileEditForm!: FormGroup;

  public userProfileEditGridForm: FormGroup = this.formBuilder.group({
    adress: ['', [Validators.required]],
    phone: ['', [Validators.pattern(this.phonePattern)]],
    salarymin: [0, [Validators.required]],
    salarymax: [7000, [Validators.required]],
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
      education: [[], []],
      experience: this.formBuilder.array([]),
      tasks2: this.formBuilder.array([]),
      certificates: this.formBuilder.array([]),//this.formBuilder.array([this.certificate]),
      organizationsAndSkills: [[], []],
    });
    // console.log(this.userProfileEditForm.value)
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
        education: [],
        experience: this.data.accountWorkExpiriance ? this.data.accountWorkExpiriance : [],
        tasks2: [],
        certificates: this.data.accountCoursesCertificates,
        organizationsAndSkills: this.data.accountSoftSkills
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
        return this.certificates.removeAt(index)
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

  addTask(item: any) {
    // console.log(item.value)
    // console.log(item.value.tasks)
    // item.tasks.push(this.formBuilder.group({
    //   taskName: ['', []]
    // }))
    // item.value.tasks.push('')
    // console.log(item.value.tasks)
  }

  public get experience() {
    return this.userProfileEditForm.get('experience') as FormArray;
  }

  public addExp() {
    this.experience.push(this.formBuilder.group({
      id: [this.userProfileEditForm.value.experience.length + 1, []],
      workcompany: ['', []],
      datestart: new FormControl<Date | null>(null), //jak na razie data dzisiaj żeby nie wywalało Ng0100
      dateend: new FormControl<Date | null>(null),
      tasks: ['', []]//this.formBuilder.array([])
    }));
    // console.log(this.experience.value[this.userProfileEditForm.value.experience.length - 1].tasks)
    // this.experience.value[this.userProfileEditForm.value.experience.length - 1].tasks.push(this.formBuilder.group({
    //   taskName: ['', []]
    // }))
    // console.log(this.experience.value[this.userProfileEditForm.value.experience.length - 1].tasks[0].value)
    // this.experience.value[this.userProfileEditForm.value.experience.length - 1].tasks.push('')
    // console.log(this.tasks2)
    // console.log(this.experience.value[this.userProfileEditForm.value.experience.length - 1]?.tasks)
    this.ref.detectChanges();
  }

  public get tasks2() {
    return this.userProfileEditForm.get('tasks2') as FormArray;
  }

  addEdu() {
    this.education.push(
      {
        name: '',
        startTime: '',
        endTime: '',
        school: '',
        degree: ''
      },
    )
  }

  public get certificates() {
    return this.userProfileEditForm.get('certificates') as FormArray;
  }

  addCert() {
    this.certificates.push(this.formBuilder.group({
      id: this.userProfileEditForm.value.certificates.length + 1,
        certificatename: ['', []],
        organizationissuingcertificate: ['', []],
        certificatenumber: ['', []],
        certificateissuedate: ['', []]
    }));
    // this.userProfileEditForm.value.certificates.push(
    //   {
    //     id: this.userProfileEditForm.value.certificates.length + 1,
    //     certificatename: '',
    //     organizationissuingcertificate: '',
    //     certificatenumber: '',
    //     certificateissuedate: ''
    //   }
    // )
  }

  addNew(softSkillType: number) {
    switch (softSkillType) {
      case 1:
        this.userProfileEditForm.value.organizationsAndSkills
        break;
      case 2:
        this.userProfileEditForm.value.organizationsAndSkills
        break;
      case 3:
        this.userProfileEditForm.value.organizationsAndSkills.push({

        })
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
      this.data.account.image = 'XD',
      this.data.account.birthdate = this.userProfileEditGridForm.value.dateOfBirth,
      this.data.account.email = this.userProfileEditGridForm.value.email,
      this.data.account.phonenumber = this.userProfileEditGridForm.value.phone,
      this.data.account.salarymax = this.userProfileEditGridForm.value.max,
      this.data.account.salarymin = this.userProfileEditGridForm.value.min
    )
  }

  public save() {
    this.accountDetails();
    this.data.accountCoursesCertificates = this.userProfileEditForm.value.certificates;
    this.data.accountWorkExpiriance = this.userProfileEditForm.value.experience;
    this.data.accountSoftSkills = this.userProfileEditForm.value.organizationsAndSkills;
    // console.log(this.userProfileEditForm.valid)
    console.log(this.userProfileEditForm.value)
    console.log(this.userProfileEditForm.value.certificates)
    // console.log(this.userProfileEditGridForm.valid)
    console.log(this.userProfileEditGridForm.value)
    console.log(this.certificate.value)
    this.editUserProfileService.updateUserById(this.data.account.id, this.data).subscribe()
  }
}
