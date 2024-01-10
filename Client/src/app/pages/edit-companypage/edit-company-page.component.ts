import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyProfile} from "../../shared/models/companies";
import {CompanyPageService} from "../companypage/company-page.service";
import {CompanySize} from "../../shared/constants/constants";

@Component({
  selector: 'app-edit-companypage',
  templateUrl: './edit-company-page.component.html',
  styleUrls: ['./edit-company-page.component.scss']
})
export class EditCompanyPageComponent implements AfterViewInit {

  data!: CompanyProfile;

  CompanySize = CompanySize;

  public currentCompanyID: number = +this.route.snapshot.params['id'];
  public returnLink: string = `/company/${this.currentCompanyID}`

  companyName = new FormControl('');
  location = new FormControl('');
  companyPlace = new FormControl('');
  companySize = new FormControl('');
  tech = new FormControl<string[]>([]);
  tools = new FormControl<string[]>([]);
  platforms = new FormControl<string[]>([]);

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
  offices = ['Poznań, Kolorowa 8'];

  constructor(private toastrService: ToastrService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private companyProfileService: CompanyPageService
  ) {}

  ngAfterViewInit(): void {
    this.companyProfileService.getCompanyById(this.currentCompanyID).subscribe(res => {
      this.data = res.methodResult;
      !(this.data.company.idaccount === +localStorage.getItem('userID')!) && this.router.navigate([`/company`]); //if user tries to change ID in ur
    })
    this.getData();
  }

  getCompanySizeKeys(): string[] {
    return Object.keys(CompanySize).filter(key => isNaN(Number(CompanySize[key])));
  }

  private getData() {
    this.companyProfileService.getCompanyById(this.currentCompanyID).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
      this.companyName.setValue(this.data.company.name)
      this.location.setValue(this.data.company.headquarteraddress)
      this.companySize.setValue(this.data.company.employeecount ? this.data.company.employeecount.toString() : '1')
      this.company.about = this.data.company.description ? this.data.company.description : '';
      this.company.image = this.data.company.logo === null ? "../../../assets/images/logoEmpty.png" : this.data.company.logo;
      if (this.data.companySocialMediaLinks.length > 0) {
        this.socials = []
      }
      this.data.companySocialMediaLinks.forEach(a => {
        this.socials.push({
          placeholder: a.name + ' link',
          icon: a.name,
          value: a.link
        })
      })

      let techSelectedValues : string[] = [];
      let toolsSelectedValues : string[] = [];
      let platformsSelectedValues : string[] = [];
      this.data.companyTechnologies.forEach(a => {
        if(a.idtechnology == 1)
          techSelectedValues.push(a.name)
        if(a.idtechnology == 2)
          toolsSelectedValues.push(a.name)
        if(a.idtechnology == 3)
          platformsSelectedValues.push(a.name)
      })
      this.tech.patchValue(techSelectedValues);
      this.tools.patchValue(toolsSelectedValues);
      this.platforms.patchValue(platformsSelectedValues);

      console.log(this.data.companyImages)

      this.imagesUrl = [];
      this.data.companyImages.forEach(a => {
        this.imagesUrl.push(a.image)
      })

    })
  }

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

  public save() {
    this.data.company.id = this.currentCompanyID
    this.data.company.name = this.companyName.value || '';
    this.data.company.headquarteraddress = this.location.value || '';
    this.data.company.employeecount = this.companySize.value ? +this.companySize.value : 1;
    this.data.company.description = this.company.about;
    this.data.company.logo = this.company.image;

    this.data.companySocialMediaLinks = [];
    this.socials.forEach(a => {
      this.data.companySocialMediaLinks.push({
        idcompany: this.currentCompanyID,
        link: a.value,
        name: a.icon
      })
    })

    //this.data.companyOffices = [];
    this.data.companyTechnologies = [];
    this.tech.value?.forEach(a => this.data.companyTechnologies.push({
      name: a,
      idtechnology: 1,
      idcompany: this.currentCompanyID
    }))
    this.tools.value?.forEach(a => this.data.companyTechnologies.push({
      name: a,
      idtechnology: 2,
      idcompany: this.currentCompanyID
    }))
    this.platforms.value?.forEach(a => this.data.companyTechnologies.push({
      name: a,
      idtechnology: 3,
      idcompany: this.currentCompanyID
    }))

    this.data.companyImages = [];
    this.imagesUrl.forEach(a => {
      this.data.companyImages.push( {
        image: a,
        idcompany: this.currentCompanyID
      })
    })

    this.companyProfileService.updateCompanyById(this.currentCompanyID, this.data).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigate([this.returnLink])
      }
    })
  }

  protected readonly Object = Object;
}
