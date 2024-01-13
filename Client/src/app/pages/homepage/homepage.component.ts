import { Component } from '@angular/core';
import { Job } from 'src/app/shared/models/job';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  user = {
    email:`test@example.com`
  }

  jobs?: Job[];

  constructor (private homepageService: HomepageService) { }
  
  ngAfterViewInit(): void {
    this.homepageService.getJobs().subscribe(res => {
      this.jobs = res.methodResult;
      
      // res.methodResult.forEach(job => 
      //   this.jobs?.push(job))

        // this.jobs && console.log('jobssss', this.jobs[0])
    })
  }

  company = {
    "longName": "T-Mobile Polska S.A.",
    "name": "T-Mobile",
    "image": "../../../assets/images/LogoTmobile.png", 
    "location": 'Poznan',
  }

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
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    },
    {
      "jobName": "Remote Technical Project Leader",
      "place": "Zdalnie",
      "tags": ["HTML", "CSS"]
    }
  ];
}
