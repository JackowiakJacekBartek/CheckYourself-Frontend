import { Component, Input, OnInit } from '@angular/core';
import { QuizAnswerDto, QuizDto, QuizQuestionDto, QuizzesAnswerDto, QuizzesQuestionDto } from 'src/app/shared/models/quizzes';
import { QuizMapper } from '../quiz-mapper';
import { QuizzesService } from '../quizzes.service';
import { Router } from '@angular/router';
import { TimerService } from '../timer/timer.service';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  quizQuestions: QuizQuestionDto[] = [];
  quiz: QuizDto = {} as QuizDto;
  elapsedTime: string = '00:00';

  @Input() quizz: QuizDto = {} as QuizDto;

  answers: QuizAnswerDto[] = [];

  constructor(
    protected quizzesService: QuizzesService,
    private router: Router,
    private timerService: TimerService
  ) {}

  currentQuestionNumber: number = 0;
  currentQuestion: QuizzesQuestionDto | undefined = {} as QuizzesQuestionDto;
  totalQuestions!: number;

  imageUrls: string[] = [
    '/assets/icons/Odp_BL.svg',
    '/assets/icons/Odp_RD.svg',
    '/assets/icons/Odp_YL.svg',
    '/assets/icons/Odp_GR.svg'
  ];

  ngOnInit() {
    this.quiz = this.quizz;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
    this.totalQuestions = this.quiz.quizzesQuestions.length;
    this.quizQuestions = QuizMapper.mapToQuestionsWithAnswers(this.quiz);

    this.quizQuestions.forEach((question, index) => {
      const answerImage = this.imageUrls[index];
      question.answers.forEach((answer, answerIndex) => {
        answer.image = this.imageUrls[answerIndex];
      });
      this.answers.push({ answers: [], question: question.question });
    });

    this.timerService.getElapsedTime().subscribe((elapsedTime) => {
      this.elapsedTime = elapsedTime;
      
      if (elapsedTime === this.quiz.quiz.totaltime) {
        this.submit()
      }
    });
  }

  isAnswerSelected(answerId: any): boolean {
    if (this.quizQuestions[this.currentQuestionNumber].question.type === 2) {
      return this.answers[this.currentQuestionNumber].answers.some(a => a.id === answerId);
    } else {
      return this.answers[this.currentQuestionNumber].answers.length > 0 &&
             this.answers[this.currentQuestionNumber].answers[0].id === answerId;
    }
  }

  onSelecting(value: Event) {
    const target = value.target as HTMLInputElement | null;
  
    if (target) {
      const answerId = Number(target.value);
  
      if (this.quizQuestions[this.currentQuestionNumber].question.type === 2) {
        // Toggle selection for multiple choice questions (type 2)
        const existingIndex = this.answers[this.currentQuestionNumber].answers.findIndex(a => a.id === answerId);
  
        if (existingIndex !== -1) {
          // Unselect if already selected
          this.answers[this.currentQuestionNumber].answers.splice(existingIndex, 1);
        } else {
          // Select if not selected
          this.answers[this.currentQuestionNumber].answers.push({
            id: answerId,
            idquestion: this.currentQuestion?.id
          } as QuizzesAnswerDto);
        }
      } else {
        // For single choice questions (type 1), replace the selected answer
        this.answers[this.currentQuestionNumber].answers = [{
          id: answerId,
          idquestion: this.currentQuestion?.id
        } as QuizzesAnswerDto];
      }
    }
  }

  onPrev() {
    --this.currentQuestionNumber;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
  }

  onNext(value: Event) {
    const countObjectsWithAnswers = this.answers.filter(item => item.answers.length > 0).length;

    if (this.answers[this.currentQuestionNumber].answers.length === 0) return;

    ++this.currentQuestionNumber;
    this.currentQuestion = this.quiz.quizzesQuestions[this.currentQuestionNumber];
  }

  submit() {
    this.quizzesService.sendQuizResults(this.answers, this.elapsedTime).subscribe(res => {
      this.router.navigate(['quiz/result/' + res.methodResult]);
    });
  }
}
