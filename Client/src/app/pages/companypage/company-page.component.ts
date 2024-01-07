import {Component, OnInit} from '@angular/core';
import {CompanyPageService} from "./company-page.service";
import {CompanyImages, CompanyOffices, CompanyProfile} from "../../shared/models/companies";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-companypage',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  public currentCompanyID: number = +this.route.snapshot.params['id'];
  public editCompanyLink: string = `/company/${this.currentCompanyID}/edit`;
  public companyIdAccount: number = 0;
  public currentUserID2: string = localStorage.getItem('userID')!
  public showEditButton: boolean = false;

  company = {
    "longName": "T-Mobile Polska S.A.",
    "name": "T-Mobile",
    "image": "../../../assets/images/logoEmpty.png",
    "employeecount": 5000,
    "location": 'Poznan',
    "about": "Jesteśmy firmą technologiczną, a naszym celem jest tworzenie innowacyjnych rozwiązań dla klientów indywidualnych i biznesowych. Jako jedni z pierwszych udostępniliśmy na rynku sieć 5G, oferujemy najlepszej jakości usługi mobilne, a dzięki kilkunastu Data Center zapewniamy całe spektrum usług ICT. Oferujemy wiele usług z zakresu rozwiązań chmurowych oraz cyber bezpieczeństwa.\n" +
      "W T-Mobile wszyscy żyjemy w świecie magenta! Kolor ten jest nam bliski, bo oznacza wiarę w powodzenie podejmowanych działań, pewność siebie i wytrzymałość. Właśnie tacy jesteśmy jako zespół. W #MagentaTeam stawiamy na wymianę doświadczeń, zwinną pracę i szybko adaptujemy się do zmian!"
  }

  technology = ['html', 'css3', 'angularjs', 'ansic', 'csharp', 'cplus', 'java', 'python', 'js', 'discordjs', 'typescript', 'androidstudio', 'react', 'unrealengine', 'arduino']

  tools = ['jenkins', 'git', 'jira']

  platforms = ['windows', 'linux']

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

  images = ['../../../assets/images/logoEmpty.png'];

  links = [''];

  constructor(private companyProfileService: CompanyPageService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.companyProfileService.getCompanyById(this.currentCompanyID).subscribe(res => {
      this.data = res.methodResult;
      this.companyIdAccount = this.data.company.idaccount;
      this.showEditButton = (+this.currentUserID2 === +this.companyIdAccount);
    })
  }

  data!: CompanyProfile;

  public currentUserID: number = +this.route.snapshot.params['id'];
  public editLink: string = `/company/${this.currentUserID}/edit`;

  companyOffices: CompanyOffices[] = [];
  extractedLinksOffices = [''];

  extractFirstLink(inputString: string): string {
    const regex = /(.*?)"/; // Wyrażenie regularne znajdujące tekst pomiędzy pierwszymi cudzysłowami
    const match = inputString.match(regex);

    if (match && match.length > 1) {
      return match[1]; // Zwróć pierwsze dopasowanie, które jest linkiem
    } else {
      return 'null; // Jeśli nie znaleziono linku, zwróć null'
    }
  }

  ngAfterViewInit(): void {
    this.companyProfileService.getCompanyById(this.currentCompanyID).subscribe(res => {
      this.data = res.methodResult;

      this.company.name = this.data.company.name;
      this.company.employeecount = this.data.company.employeecount;
      this.company.location = this.data.company.headquarteraddress;
      this.company.about = this.data.company.description;
      this.company.image = this.data.company.logo ?? "../../../assets/images/logoEmpty.png";
      this.companyOffices = this.data.companyOffices;

      this.extractedLinksOffices = [];
      this.companyOffices.forEach(a => {
        this.extractedLinksOffices.push(this.extractFirstLink(a.iframeurl))
      })

      this.images = [];
      this.data.companyImages.forEach(a => {
        this.images.push(a.image)
      })

      this.technology = [];
      this.data.companyTechnologies.forEach(a => {
        if (a.idtechnology == 1) {
          this.technology.push(a.name)
        }
      })

      this.tools = [];
      this.data.companyTechnologies.forEach(a => {
        if (a.idtechnology == 2) {
          this.tools.push(a.name)
        }
      })

      this.platforms = [];
      this.data.companyTechnologies.forEach(a => {
        if (a.idtechnology == 3) {
          this.platforms.push(a.name)
        }
      })

      this.links = [];
      this.data.companySocialMediaLinks.forEach(a => {
        this.links.push(a.link)
      })
    })
  }


}
