import {Component} from '@angular/core';
import {Offer} from '../companypage/company-page.component';
import {CompanySocialMediaLinks} from 'src/app/shared/models/companies';
import {ActivatedRoute, Router} from '@angular/router';
import {JobOfferAppliesService} from './job-offer-applies.service';
import {JobOfferApplies} from "../../shared/models/jobOfferApplies";

@Component({
    selector: 'app-job-offer-applies',
    templateUrl: './job-offer-applies.component.html',
    styleUrls: ['./job-offer-applies.component.scss']
})
export class JobOfferAppliesComponent {

    public currentJobOfferID: number = +this.route.snapshot.params['id'];
    public currentUserId: string = localStorage.getItem('userID')!

    images = ['../../../assets/images/logoEmpty.png'];
    jobOfferApplies: JobOfferApplies[] = [];

    constructor(private route: ActivatedRoute,
                protected jobOfferAppliesService: JobOfferAppliesService, private router: Router) {
        this.jobOfferAppliesService.GetAllResultsForJobAdvertisements(this.currentJobOfferID).subscribe(res => {
            // console.log(res)
            this.jobOfferApplies = res.methodResult;
            // console.log(this.jobOfferApplies[0].account.email)
        })
    }

    ngOnInit(): void {
    }

    goToProfile(i: number) {
        this.router.navigate(['/user/' + i])
    }

    openEmailClient(meil: string) {
        window.location.href = "mailto:"+meil;
    }

    percentage(i: number, j: number){
        const result = (i * 100) / j;
        return parseInt(result.toFixed(0), 10);
    }

}
