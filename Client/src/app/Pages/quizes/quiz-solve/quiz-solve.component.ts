import { Component } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.scss']
})
export class QuizSolveComponent {

  colors: string[] = ['#4285F4', '#9747FF', '#C00A68B2', '#FBBC05', 'wheat', 'teal', 'aqua', 'bisque'];

  questionImage: string = `${images}/mock-question01.png`

  mulitChoiceQuestions = [
    {
      "id": 1,
      "answere": 'true, true, true, true',
      "isCorrect": true
    },
    {
      "id": 2,
      "answere": 'true, true, true, false',
      "isCorrect": false
    },
    {
      "id": 3,
      "answere": 'false, false, false, false',
      "isCorrect": false
    },
    {
      "id": 4,
      "answere": 'true, false, true, false',
      "isCorrect": true
    }
  ];

  nextQuestion: boolean = true;

  constructor() { }

  onQuestionChanged(value: boolean) {
    this.nextQuestion = value
  }

}
