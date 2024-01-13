import { Component, Input } from '@angular/core';
import { QuizAnswerDto, QuizDto, QuizQuestionDto, QuizzesAnswerDto, QuizzesQuestionDto } from 'src/app/shared/models/quizzes';
import { QuizMapper } from '../quiz-mapper';
import { QuizzesService } from '../quizzes.service';
import { Router } from '@angular/router';
import { TimerComponent } from '../timer/timer.component';
import { TimerService } from '../timer/timer.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

  quizQuestions: QuizQuestionDto[] = [];
  quiz: QuizDto = {} as QuizDto;
  elapsedTime: string = '00:00';

  @Input() quizz: QuizDto = {} as QuizDto;

  answers: QuizAnswerDto[] = [];

  constructor(protected quizzesService: QuizzesService,
    private router: Router,
    private timerService: TimerService
    ) {
    
  }
  currentQuestionNumber: number = 0;
  currentQuestion: QuizzesQuestionDto | undefined = {} as QuizzesQuestionDto;

  totalQuestions!: number;

  ngOnInit() {
    this.quiz = this.quizz;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
    this.totalQuestions = this.quiz.quizzesQuestions.length;
    this.quizQuestions = QuizMapper.mapToQuestionsWithAnswers(this.quiz);

    this.quizQuestions.forEach(question => {
      this.answers.push({ answers: [], question: question.question });
    });
  }

  onSelecting(value: Event) {
    const target = value.target as HTMLInputElement | null;

    if (target) {
      // const answer = this.quizQuestions[this.currentQuestionNumber].answers
      // this.answers = target.value;
      // const currentQuestionToUpdate = this.quizQuestions.find(question => question.question === this.currentQuestion);
      // console.log('xd', currentQuestionToUpdate)
      // if (currentQuestionToUpdate) {
      //   // currentQuestionToUpdate.answers.push(Number(target.value));
      // }
      
      // console.log(this.answers);
      const answer = Number(target.value)
      this.answers[this.currentQuestionNumber].answers = [];
      // this.answers[this.currentQuestionNumber].answers.map(item => this.answers[this.currentQuestionNumber].answers.pop());
      this.answers[this.currentQuestionNumber].answers.push({id: answer} as QuizzesAnswerDto)
      // console.log(this.answers);
      // console.log(this.answers[0].answers.map(x => console.log(x)));
      // console.warn('xxxx', this.quizQuestions)
      // const res = this.quizQuestions.find(question => {
      //   question.question.id == Number(target.value)
      // });
      // console.warn('xxxx', this.currentQuestion)
      
      // const questionToUpdate = this.quizQuestions.find(question => question.question.id === Number(target.value));
      // console.warn('xxxx', questionToUpdate)
    }
  }
  
  onPrev() {
    --this.currentQuestionNumber;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
  }

  onNext(value: Event) {
    const countObjectsWithAnswers = this.answers.filter(item => item.answers.length > 0).length;

    console.log(countObjectsWithAnswers);

    if(this.answers[this.currentQuestionNumber].answers.length == 0) return;

    ++this.currentQuestionNumber;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
  }

  submit() {
    this.timerService.getElapsedTime().subscribe((elapsedTime) => {
      this.elapsedTime = elapsedTime;
    });

    this.quizzesService.sendQuizResults(this.answers, this.elapsedTime).subscribe(res => {
      this.router.navigate(['quiz/result/'+res.methodResult]);
    })
  }
}
