import { Component } from '@angular/core';
import { HomepageService } from './homepage.service';
import { Job, JobsQuickInfo } from 'src/app/shared/models/jobOffer';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  user = {
    email:`test@example.com`
  }

  jobs?: JobsQuickInfo[];
  searchTerm: string = '';
  locationTerm: string = '';

  constructor (private homepageService: HomepageService) { }
  
  ngAfterViewInit(): void {
    this.homepageService.getJobs(this.searchTerm, this.locationTerm).subscribe(res => {
      this.jobs = res.methodResult;
    })
  }

  searchJobs() {
    this.homepageService.getJobs(this.searchTerm, this.locationTerm).subscribe(res => {
      this.jobs = res.methodResult;
    });
  }
  // company = {
  //   "longName": "T-Mobile Polska S.A.",
  //   "name": "T-Mobile",
  //   "image": '../../../assets/images/logoEmpty.png', 
  //   "location": 'Poznan',
  // }

  // offers = [
  //   {
  //     "jobName": "Junior Fullstack Developer",
  //     "place": "Poznań",
  //     "tags": ["HTML", "CSS", "Java", "Angular"]
  //   }
  // ];
}
