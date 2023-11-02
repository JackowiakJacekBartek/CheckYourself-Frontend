import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditUserProfileService } from '../edit-user-profile.service';
import { UserProfile } from 'src/app/shared/models/accounts';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnChanges, AfterViewInit {
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

  person = {
    name: 'Mariusz',
    surname: 'Nowakowski',
    title: 'Junior Fullstack Developer',
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: '../../../assets/images/mariusz-nowakowski-avatar.png',
  };
  informations = {
    place: 'Warszawa, Mazowieckie / Zdalnie',
    phone: '784 784 965',
    salary: 'do negocjacji',
    email: 'mariusz.nowakowski@gmail.com',
    dateOfBirth: '03-10-1999',
    workTime: 'pełen etat',
    git: 'github.com/janek21',
    linkedIn: 'linkedin.com/mariusz.nowakowski',
    site: 'janekdev.com',
  };

  languages = [
    {
      language: 'Polski',
      skill: 100,
    },
    {
      language: 'Angielski',
      skill: 80,
    },
  ];

  experience = [
    {
      name: 'Tester Manualny',
      startTime: '01-11-2021',
      endTime: '12-01-2022',
      tasks: [
        'Testowanie aplikacji i tworzenie nowych zgłoszeń',
        'Pisanie dokumentacji',
        'Analizowanie działania aplikacji',
      ],
    },
    {
      name: 'Doradca Finansowy',
      startTime: '06-01-2021',
      endTime: '10-01-2021',
      tasks: [
        'Obsługa programów finansowych',
        'Rozmowa z klientami',
        'Analizowanie wniosków finansowych',
      ],
    },
  ];

  education = [
    {
      name: 'Informatyka',
      startTime: '01-01-2019',
      endTime: '01-01-2024',
      school: 'Uniwersytet im. Adama Mickiewicza',
      degree: 'Inżynier'
    },
    {
      name: 'Technik informatyk',
      startTime: '01-01-2015',
      endTime: '01-01-2019',
      school: 'Uniwersytet im. Adama Mickiewicza',
      degree: 'Technik'
    },
  ];

  certificates = [
    {
      name: 'Murarz, tynkarz, akrobata',
      org: 'Udemy Sp. z o. o.',
      cert: 'eqw543ge46',
      date: '06-18-2023'
    },
    {
      name: 'UX/UI Designer',
      org: '18-6-2023, Udemy Sp. z o. o.',
      cert: 'eqw543ge46',
      date: '06-18-2023'
    },
  ];

  organizations = ['starosta roku', 'wolontariusz w schronisku dla zwierząt'];

  skills = ['praca w zespole', 'samodzielność', 'sumienność', 'dokładność'];

  hobby = ['siłownia', 'malowanie', 'tynkowanie'];

  data!: UserProfile;


  userProfileEditForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    aboutMe: ['', [Validators.required]],
    languages: ['', [Validators.required]],
    expirience: ['', [Validators.required]],
    education: ['', [Validators.required]],
    certificatesCourses: ['', [Validators.required]],
    organizations: ['', [Validators.required]],
    softSkills: ['', [Validators.required]],
    hobby: ['', [Validators.required]],
  });

  userProfileEditGridForm: FormGroup = this.formBuilder.group({
    adress: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    salaryMin: ['', [Validators.required]],
    salaryMax: ['', [Validators.required]],
    email: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    workingTime: ['', [Validators.required]],
    gitHub: ['', [Validators.required]],
    linkedIn: ['', [Validators.required]],
    site: ['', [Validators.required]],
  });

  
  constructor(
    private ref: ChangeDetectorRef, 
    private editUserProfileService: EditUserProfileService,
    private formBuilder: FormBuilder
  ) { }


  ngAfterViewInit(): void {
    this.ref.detectChanges();
    this.editUserProfileService.getUserById(1).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
      this.userProfileEditForm.patchValue({
        name: this.data.account.name,
        surname: this.data.account.surname
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

  toDate(date: string) {
    return new Date(date);
  }

  addLang() {
    this.languages.push({
      language: '',
      skill: 0,
    });
  }

  addTask(card: any) {
    card.tasks.push('');
  }

  addExp() {
    this.experience.push({
      name: '',
      startTime: '', //jak na razie data dzisiaj żeby nie wywalało Ng0100
      endTime: '',
      tasks: [''],
    });
    this.ref.detectChanges();
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

  addCert() {
    this.certificates.push(
      {
        name: '',
        org: '',
        cert: '',
        date: ''
      }
    )
  }

  addNew(other: string) {
    switch (other) {
      case 'hobby':
        this.hobby.push('');
        break;
      case 'skills':
        this.skills.push('');
        break;
      case 'organizations':
        this.organizations.push('');
        break;
    }
  }
}
