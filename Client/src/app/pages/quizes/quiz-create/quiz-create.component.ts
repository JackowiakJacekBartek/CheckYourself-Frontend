import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EditUserProfileService } from '../../edit-userpage/edit-user-profile/edit-user-profile.service';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { QuizData, QuizDto } from 'src/app/shared/models/quizzes';
import { QuizMapper } from '../../quizzes/quiz-mapper';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent {

  public currentJobOfferId: number = +this.route.snapshot.params['id'];
  quizForm: FormGroup;
  totalQuizScore = 0.0;

  constructor(
    private ref: ChangeDetectorRef,
    private editUserProfileService: EditUserProfileService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private quizzesService: QuizzesService,
  ) {
    this.quizForm = this.formBuilder.group({
      quizName: ['Podstawy obiektowości', [Validators.required]],
      quizTechnology: ['.Net', [Validators.required]],
      maxDuration: ['10:00', [Validators.required, Validators.min(1)]],
      passingThreshold: [80, [Validators.required, Validators.min(1)]],
      maxPoints: [10, [Validators.required, Validators.min(1)]],
      quizDescription: ['description', [Validators.required]],
      questions: this.formBuilder.array([
        this.createQuestionFormGroup()
      ])
    });
  }

  createQuestionFormGroup() {
    return this.formBuilder.group({
      questionContent: ['q', [Validators.required]],
      correctAnswers: this.formBuilder.array([this.createCorrectAnswer('a', 3)], [Validators.required]),
      falseAnswers: this.formBuilder.array([this.createFalseAnswer('f1'), this.createFalseAnswer('f2'), this.createFalseAnswer('f3')], [Validators.required]),
    });
  } 

  // createQuestionFormGroup() {
  //   return this.formBuilder.group({
  //     questionContent: ['', [Validators.required]],
  //     correctAnswers: this.formBuilder.array([], [Validators.required]),
  //     falseAnswers: this.formBuilder.array([], [Validators.required]),
  //   });
  // } 


  get questionsArray() {
    return this.quizForm.get('questions') as any;
  }

  createFalseAnswer(value: string) {
    return this.formBuilder.group({
      falseAnswer: [value, [Validators.required]]
    });
  }
  
  addFalseAnswer(question: FormGroup) {
    const falseAnswersArray = question.get('falseAnswers') as FormArray;
    falseAnswersArray.push(this.createFalseAnswer(''));
  }
  
  removeFalseAnswer(question: FormGroup, index: number) {
    const falseAnswersArray = question.get('falseAnswers') as FormArray;
    falseAnswersArray.removeAt(index);
  }

  addQuestion() {
    this.questionsArray.push(this.createQuestionFormGroup());
  }

  removeQuestion(index: number) {
    this.questionsArray.removeAt(index);
  }

  createCorrectAnswer(value: string, score: number = 1) {
    return this.formBuilder.group({
      correctAnswer: [value, [Validators.required]],
      correctAnswerScore: [score, [Validators.required, Validators.min(1)]]
    });
  }
  
  addCorrectAnswer(question: FormGroup) {
    const correctAnswersArray = question.get('correctAnswers') as FormArray;
    correctAnswersArray.push(this.createCorrectAnswer('', 1)); // Default score is 1
  }
  
  removeCorrectAnswer(question: FormGroup, index: number) {
    const correctAnswersArray = question.get('correctAnswers') as FormArray;
    correctAnswersArray.removeAt(index);
  }

  submitQuiz() {
    if (this.quizForm.valid) {
      const formValues: QuizData = this.quizForm.value
      console.log(formValues);
      const mappedValues: QuizDto = QuizMapper.mapToQuizRegisterDto(formValues, this.currentJobOfferId);
      this.quizzesService.createQuizForJobAdvertisement(this.currentJobOfferId, mappedValues).subscribe(res => {
        console.log(res)
      });
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
