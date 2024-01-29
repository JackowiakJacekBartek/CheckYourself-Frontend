import {Component, OnInit} from '@angular/core';
import {CompanyPageService} from "./company-page.service";
import {CompanyImages, CompanyOffices, CompanyProfile, CompanySocialMediaLinks} from "../../shared/models/companies";
import {ActivatedRoute} from "@angular/router";
import {CompanySize, TechList} from "../../shared/constants/constants";
import {EditJobofferService} from "../edit-joboffer/edit-joboffer.service";
import {JobOffer, JobOfferGet} from "../../shared/models/jobOffer";

export interface Offer {
    jobName: string,
    location: string,
    id?: number,
    tags: string[]
}

@Component({
    selector: 'app-companypage',
    templateUrl: './company-page.component.html',
    styleUrls: ['./company-page.component.scss']
})

export class CompanyPageComponent implements OnInit {

    socials: CompanySocialMediaLinks[] = []

    public currentCompanyID: number = +this.route.snapshot.params['id'];
    public editCompanyLink: string = `/company/${this.currentCompanyID}/edit`;
    public companyIdAccount: number = 0;
    public currentUserID2: string = localStorage.getItem('userID')!
    public showEditButton: boolean = false;

    company = {
        "longName": "",
        "name": "",
        "image": "../../../assets/images/logoEmpty.png",
        "employeecount": 0,
        "location": '',
        "about": ""
    }

    technology = ['html', 'css3', 'angularjs', 'ansic', 'csharp', 'cplus', 'java', 'python', 'js', 'discordjs', 'typescript', 'androidstudio', 'react', 'unrealengine', 'arduino']

    tools = ['jenkins', 'git', 'jira']

    platforms = ['windows', 'linux']

    offers: Offer[] = []

    images = ['../../../assets/images/logoEmpty.png'];

    links = [''];

    constructor(private EditJobofferService: EditJobofferService,
                private companyProfileService: CompanyPageService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    data!: CompanyProfile;
    dataJobOfferGet!: JobOfferGet [];
    dataJobOffer!: JobOffer;

    public currentUserID: number = +this.route.snapshot.params['id'];
    public editLink: string = `/company/${this.currentUserID}/edit`;

    companyOffices: CompanyOffices[] = [];
    offices = [''];

    ngAfterViewInit(): void {
        this.companyProfileService.getCompanyById(this.currentCompanyID).subscribe(res => {
            this.data = res.methodResult;
            console.log(this.data)
            this.companyIdAccount = this.data.company.idaccount;
            this.showEditButton = (+this.currentUserID2 === +this.companyIdAccount);

            this.company.name = this.data.company.name;
            this.company.employeecount = this.data.company.employeecount;
            this.company.location = this.data.company.headquarteraddress;
            this.company.about = this.data.company.description;
            this.company.image = this.data.company.logo ?? "../../../assets/images/logoEmpty.png";
            this.companyOffices = this.data.companyOffices;

            this.offices = [];
            this.companyOffices.forEach(a => {
                this.offices.push(a.iframeurl)
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

            this.socials = this.data.companySocialMediaLinks;
        })

        this.EditJobofferService.getJobsByIdCompany(this.currentCompanyID).subscribe(res => {
            this.dataJobOfferGet = res.methodResult;
            console.log(this.dataJobOfferGet)

            this.dataJobOfferGet.forEach(a => {
                const tags = a.jobtechnologies ? a.jobtechnologies.map(tech => tech.icon) : [];

                this.offers.push({
                    jobName: a.name,
                    location: a.image,
                    id: a.id,
                    tags: tags
                })
            })
        })
    }

    checkPlatforms(a: string) {
        const platforms = ["fb", "instagram", "twitter", "linkedin"];
        return platforms.includes(a);
    }

    deleteJobOffer(id?: number) {
        if (id)
            this.EditJobofferService.deleteJob(id).subscribe(res => {
                this.dataJobOffer = res.methodResult;
                window.location.reload();
            })
    }

    getTechName(selectedNumber: string): string {
        const key = Object.keys(TechList).find(key => TechList[key] === Number(selectedNumber));
        return key || selectedNumber;
    }

    protected readonly CompanySize = CompanySize;
    protected readonly Number = Number;
}
