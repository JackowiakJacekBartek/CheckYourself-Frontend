import {Component} from '@angular/core';
import {IconComponent} from "../../components/icon/icon.component";
import {IconDto} from "../../shared/models/iconDto";
import {fbIcon, instagram, linkedin, pin, twitter, user} from "../../shared/constants/icons";

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent {
  icons!: IconDto[];

  constructor(public iconComponent: IconComponent) {
    this.icons = [
      fbIcon, twitter, instagram, linkedin, pin, user,
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
}
