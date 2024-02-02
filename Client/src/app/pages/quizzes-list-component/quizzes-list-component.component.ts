import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AreYouSurePopUpComponent } from 'src/app/components/are-you-sure-pop-up/are-you-sure-pop-up.component';
import { RegisterCompanyPopUpComponent } from 'src/app/components/register-company-pop-up/register-company-pop-up.component';
import { Company } from 'src/app/shared/models/companies';
import { CompanyPageService } from '../companypage/company-page.service';
import { QuizzesListService } from './quizzes-list-component.service';
import { JobsQuickInfo } from 'src/app/shared/models/jobOffer';
import { TechList } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-quizzes-list-component',
  templateUrl: './quizzes-list-component.component.html',
  styleUrls: ['./quizzes-list-component.component.scss']
})
export class QuizzesListComponent{

  jobs: JobsQuickInfo[] = [];

  constructor(private router: Router,
    public popUp: MatDialog,
    private quizzesService: QuizzesListService,
    private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.jobs = [];
    this.quizzesService.getJobOffers().subscribe(res => {
      this.jobs = res.methodResult;
      // console.log(res.methodResult);
    })
  }

  isImageData(image: string): boolean {
    if( image && image.startsWith('data:')){
    return true;}
    return false;
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

  getTechName(selectedNumber: string): string {
    const key = Object.keys(TechList).find(key => TechList[key] === Number(selectedNumber));
    return key || selectedNumber;
}


  addCompany() {
    // this.companyProfileService.getCompaniesById().subscribe(res => {
    //   this.data = res.methodResult;
    //   this.companies = res.methodResult;
    // })
  }

  openRegister() {
    // console.log("openRegister", this.jobs);
    this.popUp.open(RegisterCompanyPopUpComponent);
  }

  areYouSure(element: number) {
    const dialogRef = this.popUp.open(AreYouSurePopUpComponent);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'tak') {
    //     // console.log(element);
    //     // this.companyProfileService.deleteCompanyById(element).subscribe(res => // console.log(res))
    //     const indexToRemove = this.jobs.findIndex(company => company.id === element);
    //     if (indexToRemove !== -1) {
    //       this.jobs.splice(indexToRemove, 1);
    //     }
    //   }
    // });
  }
}
