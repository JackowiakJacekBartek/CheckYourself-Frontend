import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EditJobofferService} from "./edit-joboffer.service";
import {JobOffer} from "../../shared/models/jobOffer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompanySize, JobType} from "../../shared/constants/constants";

@Component({
  selector: 'app-edit-joboffer',
  templateUrl: './edit-joboffer.component.html',
  styleUrls: ['./edit-joboffer.component.scss']
})
export class EditJobofferComponent implements OnInit {

  data!: JobOffer;
  idCompany = 0
  value: string = '';
  public jobOfferEditForm: FormGroup;
  image = '../../../assets/images/logoEmpty.png'
  JobType = JobType;

  constructor(private route: ActivatedRoute,
              private EditJobofferService: EditJobofferService,
              private formBuilder: FormBuilder,
              private router: Router,
              ) {

    this.jobOfferEditForm = this.formBuilder.group({
      nameJob: ['', [Validators.required]],
      locationJobOffer : ['', []],
      dateEndOffer: ['', []],
      aboutJobOffer: ['', []],
      jobType: ['', []],
    });
  }

  getTypesWork(): string[] {
    return Object.keys(JobType).filter(key => isNaN(Number(JobType[key])));
  }

  ngOnInit(): void {
    // Odczytanie parametrów z aktualnej trasy
      this.route.queryParams.subscribe(params => {
      // params to obiekt zawierający przekazane parametry
      this.idCompany = params['idCompany'];

      // Możesz tutaj wykorzystać odczytane parametry
      console.log('idCompany:', this.idCompany);
    });


    // this.EditJobofferService.getJobById(2).subscribe(res => {
    //   this.data = res.methodResult;
    //   console.log(this.data)
    // })
  }

  saveJob() {
    this.data ={
      job: {
        name: this.jobOfferEditForm.value.nameJob,
        publicid: 'string',
        image: 'string',
        description: this.jobOfferEditForm.value.aboutJobOffer,
        employmentmethod: 3,
        employmenttype: this.jobOfferEditForm.value.jobType,
        expirationdate: this.jobOfferEditForm.value.dateEndOffer,
        salarymin: 12,
        salarymax: 14,
        companyid: this.idCompany,
      },
      jobDetails: [],
      jobapplications: [],
      jobTechnologies: []
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
