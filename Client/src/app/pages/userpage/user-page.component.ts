import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditUserProfileService} from "../edit-userpage/edit-user-profile/edit-user-profile.service";
import {UserProfileService} from "./user-profile.service";
import {
    AccountCoursesCertificate, accountEducationModelDto,
    AccountSocialMediaLinksModelDto,
    AccountSoftSkills,
    AccountTags, AccountTechnicalSkill, accountWorkExperiences,
    UserProfile
} from "../../shared/models/accounts";
import {format} from 'date-fns';
import { AccountService } from 'src/app/shared/services/user-service.service';

enum EmploymentMethodsEnum {
    FullTime = 1,
    PartTime = 2,
    Freelance = 3,
    FixedTermContract = 4
}

enum TechnicalSkillsEnum {
    Frontend = 1,
    Backend = 2,
    Tools = 3,
    ForeignLanguages = 4
}

interface Skills {
    frontend: AccountTechnicalSkill[];
    backend: AccountTechnicalSkill[];
    tools: AccountTechnicalSkill[];
    languages: AccountTechnicalSkill[];
  }

@Component({
    selector: 'app-userpage',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements AfterViewInit {

    person = {
        "name": "",
        "title": "",
        "about": "",
        "image": "../../../assets/images/logoEmpty.png"
    }

    informations = [
        {text: '', icon: "pin_drop"},
        {text: '', icon: "call"},
        {text: '', icon: "payments"},
        {text: '', icon: "mail"},
        {text: '', icon: "cake"},
        {text: '', icon: "hourglass_top"},
    ];

    tags = [
        {info: ''}
    ];

    skills: Skills  = {
        frontend: [],
        backend: [],
        tools: [],
        languages: [],
    };

    experience = [
        {
            "name": "",
            "time": "",
            "tasks": [""]
        }
    ];

    education = [
        {
            "name": "",
            "time": "",
            "school": ""
        }
    ];

    certificates = [
        {
            "name": "",
            "time": "",
            "cert": ""
        },
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
            "duties": [""]
        },
        {
            "name": "Hobby",
            "icon": "fitness_center",
            "duties": [""]
        }
    ];

    data!: UserProfile;

    public currentUserID: number = +this.route.snapshot.params['id'];
    public editLink: string = `/user/${this.currentUserID}/edit`;
    public showEditButton: boolean = (+this.currentUserID === +localStorage.getItem('userID')!);

    constructor(private route: ActivatedRoute, private UserProfileService: UserProfileService, private accountService: AccountService) {
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

            // if (res.isSuccess === true && res.methodResult == null) {
            //     this.accountService.logout();
            // }

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
            this.informations[5].text = this.getEmploymentMethodText(this.data.account.employmentmethod);

            if (this.data.account.birthdate == null) {
                this.informations[4].text = ''
            } else {
                this.informations[4].text = format(new Date(this.data.account.birthdate), 'dd/MM/yyyy');
            }

            const socials: AccountSocialMediaLinksModelDto[] = this.data.accountSocialMediaLinksModelDto;
            socials && socials.forEach(a => this.informations.push({icon: 'link', text: a.link}))

            const cert: AccountCoursesCertificate[] = this.data.accountCoursesCertificates;
            this.certificates = [];
            cert.forEach(a => this.certificates.push({
                name: a.certificatename,
                cert: 'numer certyfikatu: ' + a.certificatenumber,
                time: format(new Date(a.certificateissuedate), 'dd.MM.yyyy') + ', ' + a.organizationissuingcertificate
            }))

            const educ: accountEducationModelDto[] = this.data.accountEducationModelDto;
            this.education = [];
            educ && educ.forEach(a => this.education.push({
                name: a.professionname + ' - ' + a.professionaltitle,
                time: a.dateend ? format(new Date(a.datestart), 'MM.yyyy') + ' - ' + format(new Date(a.dateend), 'MM.yyyy') : format(new Date(a.datestart), 'yyyy') + ' - teraz',
                school: a.universityname,
            }))

            const exp: accountWorkExperiences[] = this.data.accountWorkExperiences;
            this.experience = []
            exp && exp.forEach(a => {
                const tasksArray: string[] = a.accountworkresponsibilities.map(responsibility => responsibility.name);

                this.experience.push({
                    name: a.profession ? a.workcompany + ' - ' + a.profession : a.workcompany,
                    time: a.dateend ? format(new Date(a.datestart), 'MM.yyyy') + ' - ' + format(new Date(a.dateend), 'MM.yyyy') : format(new Date(a.datestart), 'MM.yyyy') + ' - teraz',
                    tasks: tasksArray
                });
            });

            const accountSoftSkills: AccountSoftSkills[] = this.data.accountSoftSkills;
            this.other.forEach(a => a.duties = [])
            accountSoftSkills && accountSoftSkills.forEach(skill => {
                const index = skill.idaccountsoftskillstitle - 1; // Indeks w tablicy 'other'
                if (index >= 0 && index < this.other.length) {
                    this.other[index].duties.push(skill.name);
                }
            })

            const tags: AccountTags[] = this.data.accountTags;
            this.tags = tags;

            const technicalSkills: AccountTechnicalSkill[] = this.data.accountTechnicalSkills
            this.skills.frontend = technicalSkills.filter(m => m.type === TechnicalSkillsEnum.Frontend);
            this.skills.backend = technicalSkills.filter(m => m.type === TechnicalSkillsEnum.Backend);
            this.skills.tools = technicalSkills.filter(m => m.type === TechnicalSkillsEnum.Tools);
            this.skills.languages = technicalSkills.filter(m => m.type === TechnicalSkillsEnum.ForeignLanguages);

            console.log(this.skills);
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
    
    getSkillCategories(): { key: string, value: { name: string, progress: number }[] }[] {
        return Object.keys(this.skills).map(key => ({ key, value: this.skills[key] }));
      }
      
}