import { Component } from '@angular/core';
import { QuizDto } from 'src/app/shared/models/quizzes';
import { QuizzesService } from './quizzes.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent {
  isQuizToBeStarted: boolean = false;
  quiz!: QuizDto;

  constructor(protected quizzesService: QuizzesService) {
    quizzesService.getQuizByIdJobAdvertisement(50).subscribe(res => {
      this.quiz = res.methodResult;
    })
  }

  onStart() {
    this.isQuizToBeStarted = !this.isQuizToBeStarted;
  }
}
