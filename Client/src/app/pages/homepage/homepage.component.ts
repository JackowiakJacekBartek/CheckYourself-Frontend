import { Component } from '@angular/core';
import { HomepageService } from './homepage.service';
import { Job, JobsQuickInfo } from 'src/app/shared/models/jobOffer';
import {TechList} from "../../shared/constants/constants";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  TechList = TechList;

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

  getTechName(selectedNumber: number): string {
    const key = Object.keys(TechList).find(key => TechList[key] === selectedNumber);
    return key || ''; // Zwracamy pusty ciąg znaków, jeśli nie znaleziono klucza
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
  protected readonly Number = Number;
}
