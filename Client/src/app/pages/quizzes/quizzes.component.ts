import { Component } from '@angular/core';
import { QuizAnswerDto, QuizDto, QuizQuestionDto, QuizzesAnswerDto, QuizzesQuestionDto } from 'src/app/shared/models/quizzes';
import { QuizzesService } from './quizzes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent {
  isQuizToBeStarted: boolean = false;
  quiz!: QuizDto;

  currentQuestionNumber: number = 0;
  currentQuestion: QuizzesQuestionDto | undefined = {} as QuizzesQuestionDto;
  elapsedTime: string = '00:00';
  quizQuestions: QuizQuestionDto[] = [];
  answers: QuizAnswerDto[] = [];

  public jobOfferID: number = this.route.snapshot.params['id'];
  companyName: string = '';
  jobOfferName: string = '';

  constructor(protected quizzesService: QuizzesService, private router: Router, private route: ActivatedRoute) {
    quizzesService.getQuizByIdJobAdvertisement(this.jobOfferID).subscribe(res => {
      this.quiz = res.methodResult;
      console.log(this.quiz)
    })
    // @ts-ignore
    this.companyName = localStorage.getItem('companyName');
    console.log(this.companyName);
    // @ts-ignore
    this.jobOfferName = localStorage.getItem('jobOfferName');
    console.log(this.jobOfferName);
  }

  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
  }
}
