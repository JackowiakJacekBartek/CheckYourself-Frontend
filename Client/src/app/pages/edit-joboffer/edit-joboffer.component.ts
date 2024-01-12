import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EditJobofferService} from "./edit-joboffer.service";
import {JobOffer} from "../../shared/models/jobOffer";

@Component({
  selector: 'app-edit-joboffer',
  templateUrl: './edit-joboffer.component.html',
  styleUrls: ['./edit-joboffer.component.scss']
})
export class EditJobofferComponent implements OnInit {

  data!: JobOffer;
  idCompany = 0

  constructor(private route: ActivatedRoute, private EditJobofferService: EditJobofferService) {
  }
  ngOnInit(): void {
    // Odczytanie parametrów z aktualnej trasy
      this.route.queryParams.subscribe(params => {
      // params to obiekt zawierający przekazane parametry
      this.idCompany = params['idCompany'];

      // Możesz tutaj wykorzystać odczytane parametry
      console.log('idCompany:', this.idCompany);
    });

    this.EditJobofferService.getJobsByIdCompany(this.idCompany).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
    })

    // this.EditJobofferService.getJobById(2).subscribe(res => {
    //   this.data = res.methodResult;
    //   console.log(this.data)
    // })

  }

  saveJob() {
    this.data ={
      job: {
        name: 'qefeqf',
        publicid: 'string',
        image: 'string',
        description: 'string',
        employmentmethod: 3,
        employmenttype: 3,
        expirationdate: new Date(),
        salarymin: 12,
        salarymax: 14,
        companyid: 3,
      },
      jobDetails: [],
      jobapplications: [],
      jobTechnologies: []
    }


    this.EditJobofferService.createJob(this.data).subscribe(res => {
      this.data = res.methodResult;
      console.log(this.data)
    })
  }

}
