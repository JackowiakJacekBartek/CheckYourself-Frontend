import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-companypage',
  templateUrl: './edit-company-page.component.html',
  styleUrls: ['./edit-company-page.component.scss']
})
export class EditCompanyPageComponent {

  public currentUserID: number = +this.route.snapshot.params['id'];
  public returnLink: string = `/company/${this.currentUserID}`

  constructor(private toastrService: ToastrService, private translate: TranslateService, private route: ActivatedRoute,) {
  }

  companyPlace = new FormControl('');
  companySize = new FormControl('');
  tech = new FormControl('');
  tools = new FormControl('');
  platforms = new FormControl('');

  company = {
    "longName": "T-Mobile Polska S.A.",
    "image": "../../../assets/images/logoEmpty.png",
    "about": "Cześć tu T-Mobile!\n" + "Jesteśmy firmą technologiczną, a naszym celem jest tworzenie innowacyjnych rozwiązań dla klientów indywidualnych i biznesowych. Jako jedni z pierwszych udostępniliśmy na rynku sieć 5G, oferujemy najlepszej jakości usługi mobilne, a dzięki kilkunastu Data Center zapewniamy całe spektrum usług ICT. Oferujemy wiele usług z zakresu rozwiązań chmurowych oraz cyber bezpieczeństwa.\n" +
      "W T-Mobile wszyscy żyjemy w świecie magenta! Kolor ten jest nam bliski, bo oznacza wiarę w powodzenie podejmowanych działań, pewność siebie i wytrzymałość. Właśnie tacy jesteśmy jako zespół. W #MagentaTeam stawiamy na wymianę doświadczeń, zwinną pracę i szybko adaptujemy się do zmian!"
  }

  socials = [
    {placeholder: 'facebook link', icon: "fb", value: ""},
    {placeholder: 'Instagram link', icon: "instagram", value: ""},
    {placeholder: 'Twitter link', icon: "twitter", value: ""},
    {placeholder: 'Linkedin link', icon: "linkedin", value: ""},
  ];

  techList: string[] = ['html', 'css3', 'angularjs', 'ansic', 'csharp', 'cplus', 'java', 'python', 'js', 'discordjs', 'typescript', 'androidstudio', 'react', 'unrealengine', 'arduino'];
  toolsList = ['jenkins', 'git', 'jira'];
  platformsList = ['windows', 'linux'];
  imagesUrl = ["assets/images/logoEmpty.png", "assets/images/background.png"];
  offices = ['Warszawa, Piękna 7/3', 'Poznań, Piękna 7/3'];

  selectFile(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning(this.translate.instant('EditUserpage.Image uploaded'));
        this.imagesUrl.push(event.target.result);
      }
    }
  }

  selectAvatar(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.toastrService.warning(this.translate.instant('EditUserpage.Image uploaded'));
        this.company.image = event.target.result;
      }
    }
  }

  deleteFile(imgIndex: number) {
    this.imagesUrl.splice(imgIndex, 1);
  }

  addNew(office: string) {
    this.offices.push(office);
  }

  trackById(index: number) {
    return index
  }
}
