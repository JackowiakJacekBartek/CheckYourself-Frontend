import {Component, OnInit} from '@angular/core';
import {EditJobofferService} from "../edit-joboffer/edit-joboffer.service";
import {JobOffer} from "../../shared/models/jobOffer";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {

  data!: JobOffer;
  public jobOfferId: number = +this.route.snapshot.params['id'];

  constructor(private EditJobofferService: EditJobofferService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.EditJobofferService.getJobById(this.jobOfferId).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
    })
  }

}
