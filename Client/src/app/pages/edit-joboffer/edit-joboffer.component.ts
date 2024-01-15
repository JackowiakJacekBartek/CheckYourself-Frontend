import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EditJobofferService} from "./edit-joboffer.service";
import {JobDetails, JobOffer} from "../../shared/models/jobOffer";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanySize, JobType, NecessarySkill, TechList, ToolsList} from "../../shared/constants/constants";
import {CompanyPageService} from "../companypage/company-page.service";
import {CompanyProfile} from "../../shared/models/companies";

@Component({
    selector: 'app-edit-joboffer',
    templateUrl: './edit-joboffer.component.html',
    styleUrls: ['./edit-joboffer.component.scss']
})
export class EditJobofferComponent implements OnInit {

    data!: JobOffer;
    dataCompany! : CompanyProfile;
    idCompany = 0
    value: string = '';
    public jobOfferEditForm: FormGroup;
    image = '../../../assets/images/logoEmpty.png';
    companyName = '';
    JobType = JobType;
    TechList = TechList;
    NecessarySkill = NecessarySkill;
    ToolsList = ToolsList;
    mainExpJobs : JobDetails[] = [];

    constructor(private route: ActivatedRoute,
                private EditJobofferService: EditJobofferService,
                private formBuilder: FormBuilder,
                private router: Router,
                private companyPageService: CompanyPageService
    ) {

        this.jobOfferEditForm = this.formBuilder.group({
            nameJob: ['', [Validators.required]],
            locationJobOffer: ['', []],
            dateEndOffer: ['', [Validators.required]],
            aboutJobOffer: ['', []],
            jobType: ['', [Validators.required]],
            jobTechnologies: this.formBuilder.array([]),
        });
    }

    addMainExpJobs(office: string, iddetail: number) {
        this.mainExpJobs.push({ iddetail: iddetail, name: office});
    }

    delMainExpJobs(i : number) {
        this.mainExpJobs.splice(i, 1);
    }

    trackById(index: number) {
        return index
    }

    public get jobTechnologies() {
        return this.jobOfferEditForm.get('jobTechnologies') as FormArray;
    }

    addJobTechnologies(idTechType) {
        const newTechGroup = this.formBuilder.group({
            icon: ['', [Validators.required]],
            idtechnology: [idTechType, []],
            description: ['', []],
        });

        this.jobTechnologies.push(newTechGroup);
    }

    public removeAtIndex(formControl: string, index: number) {
        switch (formControl) {
            case 'jobTechnologies':
                return this.jobTechnologies.removeAt(index);
        }
    }

    filterKeys(obj: Record<string, any>): string[] {
        return Object.keys(obj).filter(key => isNaN(Number(obj[key])));
    }

    ngOnInit(): void {
        // Odczytanie parametrów z aktualnej trasy
        this.route.queryParams.subscribe(params => {
            // params to obiekt zawierający przekazane parametry
            this.idCompany = params['idCompany'];
            // Możesz tutaj wykorzystać odczytane parametry
            console.log('idCompany:', this.idCompany);
        });

        this.companyPageService.getCompanyById(this.idCompany).subscribe(res => {
            this.dataCompany = res.methodResult;
            console.log(this.dataCompany)
            this.image = this.dataCompany.company.logo;
            this.companyName = this.dataCompany.company.name;
        })


        // this.EditJobofferService.getJobById(2).subscribe(res => {
        //   this.data = res.methodResult;
        //   console.log(this.data)
        // })
    }

    saveJob() {
        this.mainExpJobs = this.mainExpJobs.filter(item => item.name !== '');

        this.data = {
            job: {
                name: this.jobOfferEditForm.value.nameJob,
                publicid: 'string',
                image: this.jobOfferEditForm.value.locationJobOffer,
                description: this.jobOfferEditForm.value.aboutJobOffer,
                employmentmethod: 3,
                employmenttype: this.jobOfferEditForm.value.jobType,
                expirationdate: this.jobOfferEditForm.value.dateEndOffer,
                salarymin: 12,
                salarymax: 14,
                companyid: this.idCompany,
            },
            jobDetails: this.mainExpJobs,
            jobapplications: [],
            jobTechnologies: this.jobOfferEditForm.value.jobTechnologies,
        }

        this.EditJobofferService.createJob(this.data).subscribe(res => {
            this.data = res.methodResult;
            console.log('Wyslana oferta:', this.data)
            if (res.isSuccess) {
                this.router.navigate(["/company"])
            }
        })
    }

    protected readonly CompanySize = CompanySize;
}
