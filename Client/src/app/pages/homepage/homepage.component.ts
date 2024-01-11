import { Component } from '@angular/core';
import { HomepageService } from './homepage.service';
import { Job } from 'src/app/shared/models/job';

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
}
