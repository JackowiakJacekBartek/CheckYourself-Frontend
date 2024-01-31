import {Component, OnInit} from '@angular/core';
import {EditJobofferService} from "../edit-joboffer/edit-joboffer.service";
import {JobOffer, JobTechnologies, JobDetails} from "../../shared/models/jobOffer";
import {ActivatedRoute} from "@angular/router";
import {CompanyProfile} from "../../shared/models/companies";
import {CompanyPageService} from "../companypage/company-page.service";
import {JobType, TechList, NecessarySkill, ToolsList} from "../../shared/constants/constants";
import {el} from "date-fns/locale";
import {HeaderComponent} from "../../components/header/header/header.component";
import { QuizzesService } from '../quizzes/quizzes.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {

  dataJobOffer!: JobOffer;
  dataCompany!: CompanyProfile;
  companyId: number = 0;
  quizId : number = 0;
  image = '../../../assets/images/logoEmpty.png';
  public jobOfferId: number = +this.route.snapshot.params['id'];
  public companyIdAccount: number = 0;
  public showEditButton: boolean = false;
  public currentUserID2: string = localStorage.getItem('userID')!

  constructor(private EditJobofferService: EditJobofferService,
              private route: ActivatedRoute,
              private companyProfileService: CompanyPageService,
              private headerComponent: HeaderComponent,
              private quizzesService: QuizzesService,
              private toastrService: ToastrService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.EditJobofferService.getJobById(this.jobOfferId).subscribe(res => {
      this.dataJobOffer = res.methodResult;
      console.log(`job`, this.dataJobOffer)

      this.companyId = this.dataJobOffer.job.companyid;
      this.companyProfileService.getCompanyById(this.dataJobOffer.job.companyid).subscribe(res => {
        this.dataCompany = res.methodResult;

        this.companyIdAccount = this.dataCompany.company.idaccount;
        this.showEditButton = (+this.currentUserID2 === +this.companyIdAccount);

        console.log(this.dataCompany)
        this.image = res.methodResult.company.logo ? res.methodResult.company.logo : '../../../assets/images/logoEmpty.png';
        this.quizId = this.dataJobOffer.job.quizid ? this.dataJobOffer.job.quizid : 0;
        console.log(this.quizId)
      })
    })
  }

  protected readonly JobType = JobType;
  protected readonly TechList = TechList;
  protected readonly NecessarySkill = NecessarySkill;
  protected readonly ToolsList = ToolsList;

  openLogin() {
    this.headerComponent.openLogin();
  }

  showPlatformSection(a : JobTechnologies[], b : number) : boolean {
    return a.some(icon => icon.idtechnology === b);
  }

  showTasksExpectations(a : JobDetails[] | undefined, b : number) : boolean {
    return !!a && a.some(icon => icon.iddetail === b);
  }

  isNumber(value: any): boolean {
    return !isNaN(Number(value));
  }

  protected readonly localStorage = localStorage;

  handleDeleteQuiz(quizId: number) {
    this.quizzesService.deleteQuizById(quizId).subscribe(res => {
      console.log(res)
      if (res.methodResult === 0 || res.methodResult === -1) { // 0 no quiz -1 no joboffer
        console.log('error usuwania')
        this.toastrService.warning(this.translate.instant('Error.UnableToDoIt'));
      } else {
        window.location.reload();
      }
    })
  }
}
