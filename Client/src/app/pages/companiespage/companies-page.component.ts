import {AfterViewInit, ChangeDetectorRef, Component, Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {CompanyPageService} from "./companies-page.service";
import {Company, CompanyImages, CompanyProfile} from "../../shared/models/companies";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {
    RegisterCompanyPopUpComponent
} from 'src/app/components/register-company-pop-up/register-company-pop-up.component';
import {AreYouSurePopUpComponent} from "../../components/are-you-sure-pop-up/are-you-sure-pop-up.component";

// import { RegisterCompanyPopUpComponent } from 'src/app/components/register-company-pop-up/register-company-pop-up.component';

@Component({
    selector: 'app-companiespage',
    templateUrl: './companies-page.component.html',
    styleUrls: ['./companies-page.component.scss'],
})

export class CompaniesPageComponent implements AfterViewInit {

    public currentCompanyID: number = +this.route.snapshot.params['id'];
    public editCompanyLink: string = `/company/${this.currentCompanyID}/edit`;

    displayedColumns: string[] = ['companyName'];
    companies: Company[] = [];

    goToEdit(i: number){
      this.router.navigate(['/company/'+i+'/edit'])
    }

    constructor(private router: Router, public popUp: MatDialog, private companyProfileService: CompanyPageService, private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
        this.companies=[];
        this.companyProfileService.getCompaniesById().subscribe(res => {
            this.data = res.methodResult;
            this.companies = res.methodResult;
            console.log('ngAfterViewInit', this.companies);
            this.addCompany();
        })
    }

    data!: Company[];

    addCompany() {
        console.log('123', this.companies);
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
