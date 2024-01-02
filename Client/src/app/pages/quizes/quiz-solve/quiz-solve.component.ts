import { Component } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';
import { QuizModel } from 'src/app/shared/models/quiz';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.scss']
})
export class QuizSolveComponent {

  alpha: number = 0.7
  alphaStrong: number = 0.5
  colors: string[] = [
    `rgba(66, 133, 244, ${this.alpha})`, //blue
    `rgba(151, 71, 255, ${this.alpha})`, //purple
    `rgba(191, 42, 72, ${this.alpha})`, //red
    `rgba(251, 188, 5, ${this.alphaStrong})`, //yellow
    'wheat', 'teal', 'aqua', 'bisque'
  ];
  backgroundImages: string[] = [
    "url('/assets/icons/logo_svg_blue.svg')",
    "url('/assets/icons/logo_svg_purple.svg')",
    "url('/assets/icons/logo_svg_red.svg')",
    "url('/assets/icons/logo_svg_yellow.svg')",
  ]

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

  questionNumber: number = 0;
  startTime: Date;
  public ellapsedTime = '00:00';
  private timer: any = null;
  public quiz!: QuizModel;

  constructor() { 


    this.quiz = {
      technology: "Super Techno",
      title: "Tyteł",
      questions: [
        {
          type: "multiple choice",
          question: "Tutaj pytanie tego typa?",
          code: "tutaj kod albop null",
          answers: {
              correct: [
                  "dziabu",
                  "dabix",
                  "dziop"
              ],
              incorrect: [
                  "smuteg",
                  "żal",
                  "niedowierzanie"
              ]
          }
        },
        {
          type: "multiple choice",
          question: "Tutaj pytanie tego typa? awd",
          code: "tutaj kod albop null sda",
          picture: "tutaj obrazek albo null asd",
          film: "tutaj film albo null asd",
          answers: {
              correct: [
                  "dziabu ss",
                  "dabix dd",
                  "dziop ww"
              ],
              incorrect: [
                  "smuteg sad",
                  "żal awds",
                  "niedowierzanie asdw"
              ]
          }
        },
        {
          type: "finish sentence",
          code: "tutaj kod albop null",
          picture: "tutaj obrazek albo null",
          film: "tutaj film albo null",
          sentences: [
              {
                  question: "Tutaj pytanie tego typa1?",
                  answers: {
                      correct: [
                          "dziabu",
                          "dabix",
                          "dziop"
                      ],
                      incorrect: [
                          "smuteg"
                      ]
                  }
              },
              {
                  question: "Tutaj typo kończy pytanie...",
                  answers: {
                      correct: [
                          "dziabu",
                          "dabix",
                          "dziop"
                      ],
                      incorrect: [
                          "smuteg",
                          "żal",
                          "niedowierzanie"
                      ]
                  }
              }
          ]
        },
      ]
    }


    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  private tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    // if (diff >= this.config.duration) {
    //   // this.onSubmit();
    // }
    this.ellapsedTime = this.parseTime(diff);
  }

  private parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onQuestionChanged() {
    console.log(this.quiz.questions.length)
    console.log(this.questionNumber)
    if (this.quiz.questions.length > this.questionNumber + 1) this.questionNumber += 1;
  }

}
