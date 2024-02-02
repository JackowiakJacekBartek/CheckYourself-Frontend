import { Component } from '@angular/core';
import { Offer } from '../companypage/company-page.component';
import { CompanySocialMediaLinks } from 'src/app/shared/models/companies';
import { ActivatedRoute } from '@angular/router';
import { JobOfferAppliesService } from './job-offer-applies.service';

@Component({
  selector: 'app-job-offer-applies',
  templateUrl: './job-offer-applies.component.html',
  styleUrls: ['./job-offer-applies.component.scss']
})
export class JobOfferAppliesComponent {

  public currentJobOfferID: number = +this.route.snapshot.params['id'];
  public currentUserId: string = localStorage.getItem('userID')!

  images = ['../../../assets/images/logoEmpty.png'];

  constructor(private route: ActivatedRoute,
    protected jobOfferAppliesService: JobOfferAppliesService) {
      this.jobOfferAppliesService.GetAllResultsForJobAdvertisements(this.currentJobOfferID).subscribe( res => {
        console.log(res)
      })
  }

  ngOnInit(): void {
  }

}
