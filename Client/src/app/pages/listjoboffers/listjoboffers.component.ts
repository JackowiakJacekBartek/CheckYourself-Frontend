import {Component} from '@angular/core';
import {LoginPopUpComponent} from "../landingpage/login-pop-up/login-pop-up.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-listjoboffers',
  templateUrl: './listjoboffers.component.html',
  styleUrls: ['./listjoboffers.component.scss']
})
export class ListjoboffersComponent {

  constructor(private popUp: MatDialog,) {
  }

  company = {
    "longName": "T-Mobile Polska S.A.",
    "name": "T-Mobile",
    "image": "../../../assets/images/LogoTmobile.png",
    "about": "Jesteśmy firmą technologiczną, a naszym celem jest tworzenie innowacyjnych rozwiązań dla klientów indywidualnych i biznesowych. Jako jedni z pierwszych udostępniliśmy na rynku sieć 5G, oferujemy najlepszej jakości usługi mobilne, a dzięki kilkunastu Data Center zapewniamy całe spektrum usług ICT. Oferujemy wiele usług z zakresu rozwiązań chmurowych oraz cyber bezpieczeństwa.\n" +
      "W T-Mobile wszyscy żyjemy w świecie magenta! Kolor ten jest nam bliski, bo oznacza wiarę w powodzenie podejmowanych działań, pewność siebie i wytrzymałość. Właśnie tacy jesteśmy jako zespół. W #MagentaTeam stawiamy na wymianę doświadczeń, zwinną pracę i szybko adaptujemy się do zmian!"
  }
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
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    }
  ];

  areYouSure() {
    this.popUp.open(LoginPopUpComponent);
  }
}
