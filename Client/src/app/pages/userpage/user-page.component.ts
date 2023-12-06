import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EditUserProfileService} from "../edit-userpage/edit-user-profile/edit-user-profile.service";
import {UserProfileService} from "./user-profile.service";
import {AccountSoftSkill, UserProfile} from "../../shared/models/accounts";
import { format } from 'date-fns';

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
    {text: 'github.com/janek21', icon: "link"},
    {text: 'linkedin.com/mariusz.nowakowski', icon: "link"},
    {text: 'janekdev.com', icon: "web"},
  ];

  tags = [
    {text: 'Java Lover'},
    {text: 'JS Newbie'}
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
      "school": "numer certyfikatu: eqw543ge46"
    }
  ];

  other  = [
    {
      "name": "Organizacje i stowarzyszenia",
      "icon": "corporate_fare",
      "duties": ["starosta roku", "wolontariusz w schronisku dla zwierząt"]
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
  public editLink: string = `/userpage/${this.currentUserID}/edit`;
  public showEditButton: boolean = (+this.currentUserID === +localStorage.getItem('userID')!);

  constructor(private route: ActivatedRoute, private UserProfileService: UserProfileService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.UserProfileService.getUserById(this.currentUserID).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
      if(!this.data) return;
      this.person = ({
        name: this.data.account.name + " " + this.data.account.surname,
        title: "Junior Fullstack Developer",
        about: this.data.account.description,
        image: this.data.account.image ?? "../../../assets/images/logoEmpty.png"
      });
      this.informations[0].text = 'Warszawa, Mazowieckie / Zdalnie';
      this.informations[1].text = this.data.account.phoneNumber;
      this.informations[2].text = 'do negocjacji';
      this.informations[3].text = this.data.account.email;
      this.informations[4].text = format(new Date(this.data.account.birthdate), 'dd/MM/yyyy');
      this.informations[5].text = 'pełen etat';
      this.informations[6].text = 'github.com/janek21';
      this.informations[7].text = 'linkedin.com/mariusz.nowakowski';
      this.informations[8].text = 'janekdev.com';

      const accountSoftSkill: AccountSoftSkill[] = this.data.accountSoftSkill; // Przypisanie danych z serwera

      this.other.forEach(a => a.duties = [])
      accountSoftSkill.forEach(skill => {
        const index = skill.idaccountsoftskillstitle - 1; // Indeks w tablicy 'other'
        if (index >= 0 && index < this.other.length) {
          this.other[index].duties.push(skill.name);
        }
      })
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
