import {Component} from '@angular/core';
import {IconComponent} from "../../components/icon/icon.component";
import {IconDto} from "../../shared/models/iconDto";
import {
  addtool,
  androidstudio,
  angularjs,
  ansic, arduino, cplus, csharp,
  css3, discordjs,
  fbIcon, giticon,
  html,
  instagram, java, jenkins, jira, jsicon,
  linkedin, linuxicon,
  pin, python, react,
  twitter, typescripticon, unrealengine,
  user, windows
} from "../../shared/constants/icons";

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent {
  icons!: IconDto[];

  constructor(public iconComponent: IconComponent) {
    this.icons = [
      fbIcon, twitter, instagram, linkedin, pin, user, html, css3, angularjs, ansic, csharp, cplus, java, python, jsicon, discordjs, androidstudio, react, unrealengine, arduino, addtool, typescripticon, jenkins, giticon, jira, windows, linuxicon
    ];

    this.icons.map(icon => iconComponent.putIcon(icon.name, icon.path))
  }

  company = {
    "longName": "T-Mobile Polska S.A.",
    "name": "T-Mobile",
    "image": "../../../assets/LogoTmobile.png",
    "about": "Jesteśmy firmą technologiczną, a naszym celem jest tworzenie innowacyjnych rozwiązań dla klientów indywidualnych i biznesowych. Jako jedni z pierwszych udostępniliśmy na rynku sieć 5G, oferujemy najlepszej jakości usługi mobilne, a dzięki kilkunastu Data Center zapewniamy całe spektrum usług ICT. Oferujemy wiele usług z zakresu rozwiązań chmurowych oraz cyber bezpieczeństwa.\n" +
      "W T-Mobile wszyscy żyjemy w świecie magenta! Kolor ten jest nam bliski, bo oznacza wiarę w powodzenie podejmowanych działań, pewność siebie i wytrzymałość. Właśnie tacy jesteśmy jako zespół. W #MagentaTeam stawiamy na wymianę doświadczeń, zwinną pracę i szybko adaptujemy się do zmian!"
  }

  technology = ['html', 'css3', 'angularjs', 'ansic', 'csharp', 'cplus', 'java', 'python', 'jsicon', 'discordjs', 'typescripticon', 'androidstudio', 'react', 'unrealengine', 'arduino']

  tools = ['jenkins', 'giticon', 'jira']

  platforms = ['windows', 'linuxicon']

  offers = [
    {
      "jobName": "Junior Fullstack Developer",
      "place": "Poznań",
      "tags": ["HTML", "CSS", "Java", "Angular"]
    },
    {
      "jobName": "Mid Angular Developer",
      "place": "Zdalnie",
      "tags": ["Angular"]
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    }
  ];


}
