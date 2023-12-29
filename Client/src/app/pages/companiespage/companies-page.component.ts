import {Component} from '@angular/core';
import {CompanyPageService} from "./companies-page.service";
import {Company, CompanyImages, CompanyProfile} from "../../shared/models/companies";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-companiespage',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss']
})
export class CompaniesPageComponent {

  displayedColumns: string[] = ['companyName'];
  companies!: Company[];;

  constructor(private companyProfileService: CompanyPageService, private route: ActivatedRoute) {
  }

  data!: Company[];

  ngAfterViewInit(): void {
    this.companyProfileService.getCompaniesById().subscribe(res => {
      this.data = res.methodResult;
      this.companies = res.methodResult;
      console.log(res.methodResult)
    })
  }
}
