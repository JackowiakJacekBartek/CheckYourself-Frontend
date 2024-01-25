import {Component, OnInit} from '@angular/core';
import {EditJobofferService} from "../edit-joboffer/edit-joboffer.service";
import {JobOffer} from "../../shared/models/jobOffer";
import {ActivatedRoute} from "@angular/router";
import {CompanyProfile} from "../../shared/models/companies";
import {CompanyPageService} from "../companypage/company-page.service";
import {JobType} from "../../shared/constants/constants";

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {

  dataJobOffer!: JobOffer;
  dataCompany!: CompanyProfile;
  image = '../../../assets/images/logoEmpty.png';
  public jobOfferId: number = +this.route.snapshot.params['id'];

  constructor(private EditJobofferService: EditJobofferService,
              private route: ActivatedRoute,
              private companyProfileService: CompanyPageService) {
  }

  ngOnInit(): void {
    this.EditJobofferService.getJobById(this.jobOfferId).subscribe(res => {
      this.dataJobOffer = res.methodResult;
      console.log(this.dataJobOffer)

      this.companyProfileService.getCompanyById(this.dataJobOffer.job.companyid).subscribe(res => {
        this.dataCompany = res.methodResult;
        console.log(this.dataCompany)
        this.image = res.methodResult.company.logo;
      })
    })
  }

  protected readonly JobType = JobType;
}
