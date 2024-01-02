import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditUserProfileService} from "../edit-userpage/edit-user-profile/edit-user-profile.service";
import {UserProfileService} from "./user-profile.service";
import {
  AccountCoursesCertificate, accountEducationModelDto,
  AccountSocialMediaLinksModelDto,
  AccountSoftSkills,
  AccountTags, accountWorkExperiences,
  UserProfile
} from "../../shared/models/accounts";
import {format} from 'date-fns';

enum EmploymentMethodsEnum {
  FullTime = 1,
  PartTime = 2,
  Freelance = 3,
  FixedTermContract = 4
}

@Component({
  selector: 'app-userpage',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  person = {
    "name": "Mariusz Nowakowski",
    "title": "Junior Fullstack Developer",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "image": "../../../assets/images/logoEmpty.png"
  }
  informations = [
    {text: 'Warszawa, Mazowieckie / Zdalnie', icon: "pin_drop"},
    {text: '784 784 965', icon: "call"},
    {text: 'do negocjacji', icon: "payments"},
    {text: 'mariusz.nowakowski@gmail.com', icon: "mail"},
    {text: '10 marca 1999', icon: "cake"},
    {text: 'pełen etat', icon: "hourglass_top"},
  ];

  tags = [
    {info: 'Java Lover'},
    {info: 'JS Newbie'}
  ];

  skills = {
    "Technologie frontend": {"HTML": 70, "CSS": 98, "JavaScript": 45},
    "Technologie backend": {"Java": 85, "Spring": 70, "Python": 45},
    "Narzędzia": {"Git": 45, "Jira": 98},
    "Języki obce": {"Polski": 100, "Angielski": 80}
  };

  experience = [
    {
      "name": "Tester Manualny",
      "time": "listopad 2021 - grudzień 2022",
      "tasks": ["Testowanie aplikacji i tworzenie nowych zgłoszeń", "Pisanie dokumentacji", "Analizowanie działania aplikacji"]
    },
    {
      "name": "Doradca Finansowy",
      "time": "czerwiec 2021 - październik 2021",
      "tasks": ["Obsługa programów finansowych", "Rozmowa z klientami", "Analizowanie wniosków finansowych"],
    }
  ];

  education = [
    {
      "name": "Informatyka - inż.",
      "time": "2019 - 2024",
      "school": "Uniwersytet im. Adama Mickiewicza"
    },
    {
      "name": "Technik informatyk",
      "time": "2015 - 2019",
      "school": "Uniwersytet im. Adama Mickiewicza"
    }
  ];

  certificates = [
    {
      "name": "Murarz, tynkarz, akrobata",
      "time": "18 czerwca 2023, Udemy Sp. z o. o.",
      "cert": "numer certyfikatu: eqw543ge46"
    },
    {
      "name": "UX/UI Designer",
      "time": "18 czerwca 2023, Udemy Sp. z o. o.",
      "cert": "numer certyfikatu: eqw543ge46"
    }
  ];

  other = [
    {
      "name": "Organizacje i stowarzyszenia",
      "icon": "corporate_fare",
      "duties": [""]
    },
    {
      "name": "Umiejętności miękkie",
      "icon": "mood",
      "duties": ["praca w zespole", "samodzielność", "sumienność", "dokładność"]
    },
    {
      "name": "Hobby",
      "icon": "fitness_center",
      "duties": ["siłownia", "malowanie", "tynkowanie"]
    }
  ];

  data!: UserProfile;

  public currentUserID: number = +this.route.snapshot.params['id'];
  public editLink: string = `/user/${this.currentUserID}/edit`;
  public showEditButton: boolean = (+this.currentUserID === +localStorage.getItem('userID')!);

  constructor(private route: ActivatedRoute, private UserProfileService: UserProfileService) {
  }

  ngOnInit(): void {
  }

  getEmploymentMethodText(number: number): string {
    switch (number) {
      case EmploymentMethodsEnum.FullTime:
        return 'Praca na pełen etat';
      case EmploymentMethodsEnum.PartTime:
        return 'Praca na niepełny etat';
      case EmploymentMethodsEnum.Freelance:
        return 'Praca jako freelancer (umowa zlecenie)';
      case EmploymentMethodsEnum.FixedTermContract:
        return 'Umowa o pracę na czas określony';
      default:
        return 'Praca na pełen etat';
    }
  }

  getSalary(number: number): string {
    if (number !== null || number > 0) {
      return number + 'zł'
    } else {
      return 'do negocjacji'
    }
  }

  ngAfterViewInit(): void {
    this.UserProfileService.getUserById(this.currentUserID).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
      if (!this.data) return;
      this.person = ({
        name: this.data.account.name + " " + this.data.account.surname,
        title: this.data.account.title,
        about: this.data.account.description,
        image: this.data.account.image ?? "../../../assets/images/logoEmpty.png"
      });
      this.informations[0].text = this.data.account.location;
      this.informations[1].text = this.data.account.phonenumber;
      this.informations[2].text = this.getSalary(this.data.account.salarymin);
      this.informations[3].text = this.data.account.email;
      this.informations[4].text = format(new Date(this.data.account.birthdate), 'dd/MM/yyyy');
      this.informations[5].text = this.getEmploymentMethodText(this.data.account.employmentmethod);

      const socials: AccountSocialMediaLinksModelDto[] = this.data.accountSocialMediaLinksModelDto;
      socials.forEach(a => this.informations.push({icon: 'link', text: a.link}))

      const cert: AccountCoursesCertificate[] = this.data.accountCoursesCertificates;
      this.certificates = [];
      cert.forEach(a => this.certificates.push({
        name: a.certificatename,
        cert: 'numer certyfikatu: ' + a.certificatenumber,
        time: format(new Date(a.createdat), 'dd.MM.yyyy') + ', ' + a.organizationissuingcertificate
      }))

      const educ: accountEducationModelDto[] = this.data.accountEducationModelDto;
      this.education = [];
      educ.forEach(a => this.education.push({
        name: a.professionname + ' - ' + a.professionaltitle,
        time: a.dateend ? format(new Date(a.datestart), 'yyyy') + ' - ' + format(new Date(a.dateend), 'MM.yyyy') : format(new Date(a.datestart), 'yyyy') + ' - teraz',
        school: a.universityname,
      }))

      const exp: accountWorkExperiences[] = this.data.accountWorkExperiences;
      this.experience = []
      exp.forEach(a => {
        const tasksArray: string[] = a.accountworkresponsibilities.map(responsibility => responsibility.name);

        this.experience.push({
          name: a.profession ? a.workcompany + ' - ' + a.profession : a.workcompany,
          time: a.dateend ? format(new Date(a.datestart), 'MM.yyyy') + ' - ' + format(new Date(a.dateend), 'MM.yyyy') : format(new Date(a.datestart), 'MM.yyyy') + ' - teraz',
          tasks: tasksArray
        });
      });

      const accountSoftSkills: AccountSoftSkills[] = this.data.accountSoftSkills;
      this.other.forEach(a => a.duties = [])
      accountSoftSkills.forEach(skill => {
        const index = skill.idaccountsoftskillstitle - 1; // Indeks w tablicy 'other'
        if (index >= 0 && index < this.other.length) {
          this.other[index].duties.push(skill.name);
        }
      })

      const tags: AccountTags[] = this.data.accountTags;
      this.tags = tags;

    })
  }

  public keepOrder = (a: any, b: any) => {
    return a;
  }

  public updateColor(progress: any) {
    if (progress < 50) {
      return 'warn';
    } else if (progress < 80) {
      return 'accent';
    } else {
      return 'primary';
    }
  }

}
