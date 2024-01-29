import {AfterViewInit, ChangeDetectorRef, Component, Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {CompanyPageService} from "./companies-page.service";
import {Company, CompanyImages, CompanyProfile} from "../../shared/models/companies";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {
  RegisterCompanyPopUpComponent
} from 'src/app/components/register-company-pop-up/register-company-pop-up.component';
import {AreYouSurePopUpComponent} from "../../components/are-you-sure-pop-up/are-you-sure-pop-up.component";

@Component({
  selector: 'app-companiespage',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
})

export class CompaniesPageComponent implements AfterViewInit {

  data!: Company[];

  companies: Company[] = [];

  constructor(private router: Router,
              public popUp: MatDialog,
              private companyProfileService: CompanyPageService,
              private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.companies = [];
    this.companyProfileService.getCompaniesById().subscribe(res => {
      this.data = res.methodResult;
      this.companies = res.methodResult;
      console.log('ngAfterViewInit', this.companies);
      this.addCompany();
    })
  }

  goToEdit(i: number) {
    this.router.navigate(['/company/' + i + '/edit'])
  }

  goToEditJob(i: number) {
    const parametry = {
      idCompany: i
    };
    this.router.navigate(['/create-joboffer'], {queryParams: parametry})
  }

  addCompany() {
    this.companyProfileService.getCompaniesById().subscribe(res => {
      this.data = res.methodResult;
      this.companies = res.methodResult;
    })
  }

  openRegister() {
    console.log("openRegister", this.companies);
    this.popUp.open(RegisterCompanyPopUpComponent);
  }

  areYouSure(element: number) {
    const dialogRef = this.popUp.open(AreYouSurePopUpComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'tak') {
        console.log(element);
        this.companyProfileService.deleteCompanyById(element).subscribe(res => console.log(res))
        const indexToRemove = this.companies.findIndex(company => company.id === element);
        if (indexToRemove !== -1) {
          this.companies.splice(indexToRemove, 1);
        }
      }
    });
  }
}
