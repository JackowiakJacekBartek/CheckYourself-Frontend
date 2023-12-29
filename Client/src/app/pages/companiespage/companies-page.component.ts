import {Component} from '@angular/core';
import {CompanyPageService} from "./companies-page.service";
import {Company, CompanyImages, CompanyProfile} from "../../shared/models/companies";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { MatDialog } from '@angular/material/dialog';
import { RegisterCompanyPopUpComponent } from 'src/app/components/register-company-pop-up/register-company-pop-up.component';
// import { RegisterCompanyPopUpComponent } from 'src/app/components/register-company-pop-up/register-company-pop-up.component';

@Component({
  selector: 'app-companiespage',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss']
})
export class CompaniesPageComponent {

  displayedColumns: string[] = ['companyName'];
  companies!: Company[];;

  constructor(public popUp: MatDialog, private companyProfileService: CompanyPageService, private route: ActivatedRoute) {
  }

  data!: Company[];

  ngAfterViewInit(): void {
    this.companyProfileService.getCompaniesById().subscribe(res => {
      this.data = res.methodResult;
      this.companies = res.methodResult;
      console.log(res.methodResult)
    })
  }

  openRegister() {
    this.popUp.open(RegisterCompanyPopUpComponent);
  }
}
