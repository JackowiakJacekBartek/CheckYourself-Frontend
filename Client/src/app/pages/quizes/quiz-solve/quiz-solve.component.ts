import { Component } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';
import { QuizModel } from 'src/app/shared/models/quiz';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.scss']
})
export class QuizSolveComponent {

  private areCorrectQuestions: boolean[] = [];

  alpha: number = 0.7
  alphaStrong: number = 0.5
  colors: string[] = [
    `rgba(66, 133, 244, ${this.alpha})`, //blue
    `rgba(151, 71, 255, ${this.alpha})`, //purple
    `rgba(191, 42, 72, ${this.alpha})`, //red
    `rgba(251, 188, 5, ${this.alphaStrong})`, //yellow
    'wheat', 
    'teal', 
    'aqua', 
    'bisque'
  ];
  backgroundImages: string[] = [
    "url('/assets/icons/logo_svg_blue.svg')",
    "url('/assets/icons/logo_svg_purple.svg')",
    "url('/assets/icons/logo_svg_red.svg')",
    "url('/assets/icons/logo_svg_yellow.svg')",
    "url('/assets/icons/logo_svg_default.svg')",
    "url('/assets/icons/logo_svg_default.svg')",
    "url('/assets/icons/logo_svg_default.svg')",
    "url('/assets/icons/logo_svg_default.svg')",
  ]

  questionImage: string = `${images}/mock-question01.png`

  questionNumber: number = 0;
  startTime: Date;
  public ellapsedTime = '00:00';
  public totalTime = '00:04';
  private timer: any = null;
  public quiz!: QuizModel;
  public showResultScreen: boolean = false;

  constructor() { 


    this.quiz = {
      technology: "Super Techno",
      title: "Tyteł",
      questions: [
        {
          type: "single-choice",
          question: "Tutaj pytanie tego typa?",
          code: "tutaj kod albop null",
          answers: {
              correct: [
                  "dziabu",
              ],
              incorrect: [
                  "smuteg",
                  "żal",
                  "niedowierzanie",
                  "dabix",
                  "dziop"
              ]
          }
        },
        {
          type: "multiple-choice",
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
          type: "multiple-choice",
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
          type: "multiple-select",
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
                          "dziabu2",
                          "dabix3",
                          "dziop4"
                      ],
                      incorrect: [
                          "smuteg5",
                          "żal6",
                          "niedowierzanie7"
                      ]
                  }
              }
          ]
        },
        {
          type: "multiple-select",
          code: "tutaj kod albop nullv2",
          picture: "tutaj obrazek albo nullv2",
          film: "tutaj film albo nullv2",
          sentences: [
              {
                  question: "Tutaj pytanie tego typa1?v2",
                  answers: {
                      correct: [
                          "dziabuv2",
                          "dabixv2",
                          "dziopv2"
                      ],
                      incorrect: [
                          "smutegv2"
                      ]
                  }
              },
              {
                  question: "Tutaj typo kończy pytanie...v2",
                  answers: {
                      correct: [
                          "dziabu2v2",
                          "dabix3v2",
                          "dziop4v2"
                      ],
                      incorrect: [
                          "smuteg5v2",
                          "żal6v2",
                          "niedowierzanie7v2"
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
    const diffInSeconds = (now.getTime() - this.startTime.getTime()) / 1000;

    this.ellapsedTime = this.parseTime(diffInSeconds);

    const [minutes, seconds] = this.totalTime.split(':');
    const totalTimeInSeconds = (+minutes * 60) + +seconds;

    if (diffInSeconds >= totalTimeInSeconds) {
      // this.onSubmit();
      console.log('Czas upłynął! o ', -1* (totalTimeInSeconds - diffInSeconds), ' sekund');
    }
  }

  private parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  onQuestionChanged(incorrectQuestion: boolean) {
    this.areCorrectQuestions.push(incorrectQuestion)
    this.quiz.questions.length === this.questionNumber + 1 ? this.showResultScreen = true : this.questionNumber += 1
    console.log(this.areCorrectQuestions) 
  }

  // nextQuestion(option: any) {
  //   console.log('hereee1', option.answers.incorrect)
  //   console.log('hereee2', this.pickedOptions)
  //   this.questionChanged.emit(option.answers.incorrect.some(r => this.pickedOptions.includes(r)));
  //   this.pickedOptions = [];
  // }
}
