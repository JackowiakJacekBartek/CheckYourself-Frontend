import {AfterViewInit, Component} from '@angular/core';
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

    public companyProfileEditForm: FormGroup;

    public currentUserID: number = +this.route.snapshot.params['id'];
    public currentCompanyID: number = +this.route.snapshot.params['id'];
    public returnLink: string = `/company/${this.currentUserID}`

    constructor(private toastrService: ToastrService,
                private translate: TranslateService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private companyProfileService: CompanyPageService
    ) {

        this.companyProfileEditForm = this.formBuilder.group({
            companyName: '',
            companyPlace: '',
            companySize: '',
            tech: '',
            tools: '',
            platforms: ''
        })
    }

    ngAfterViewInit(): void {
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
            this.socials = [];
            this.data.companySocialMediaLinks.forEach(a => {
              this.socials.push( {
                placeholder : a.name+' link',
                icon : a.name,
                value: a.link
              })
            })
        })
    }

    companyName = new FormControl('');
    location = new FormControl('');
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

    public save() {
        this.data.company.id = this.currentCompanyID
        this.data.company.name = this.companyName.value || '';
        this.data.company.headquarteraddress = this.location.value || '';
        this.data.company.employeecount = this.companySize.value ? +this.companySize.value : 1;
        this.data.company.description = this.company.about;
        this.data.company.logo = this.company.image;

      this.data.companySocialMediaLinks = [];
        this.socials.forEach(a => {
          this.data.companySocialMediaLinks.push( {
            idcompany: this.currentCompanyID,
            link: a.value,
            name: a.icon
          })
        })
        //this.data.companyOffices = [];
        //this.data.companyTechnologies = [];
        //this.data.companyImages = [];
        //this.data.companySocialMediaLinks = [];

        console.log(this.data)
        this.companyProfileService.updateCompanyById(this.currentCompanyID, this.data).subscribe(res => {
            if (res.isSuccess) {
                this.router.navigate([this.returnLink])
            }
        })
    }

  protected readonly Object = Object;
}
