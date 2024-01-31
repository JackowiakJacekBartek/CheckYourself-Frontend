import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EditUserProfileService } from '../../edit-userpage/edit-user-profile/edit-user-profile.service';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { QuizData, QuizDto } from 'src/app/shared/models/quizzes';
import { QuizMapper } from '../../quizzes/quiz-mapper';
import { v4 as uuidv4 } from 'uuid';

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
    private quizzesService: QuizzesService
  ) {
    this.quizForm = this.formBuilder.group({
      quizName: ['', [Validators.required]],
      quizTechnology: ['', [Validators.required]],
      maxDuration: ['10:00', [Validators.required, Validators.min(1)]],
      passingThreshold: [50, [Validators.required, Validators.min(1)]],
      quizDescription: ['', [Validators.required]],
      questions: this.formBuilder.array([])
    });
  }


  ngOnInit() {
    this.quizForm.valueChanges.subscribe(() => {
      this.calculateTotalQuizScore();
    });
  }

  createQuestionFormGroup() {
    let id = parseInt(uuidv4().substring(0, 4), 16)

    return this.formBuilder.group({
      id: id,
      questionContent: ['', [Validators.required]],
      correctAnswers: this.formBuilder.array([], [Validators.required]),
      falseAnswers: this.formBuilder.array([], [Validators.required]),
    });
  }

  calculateTotalQuizScore() {
    let totalScore = 0;
    const questionsArray = this.quizForm.get('questions') as FormArray;

    questionsArray.controls.forEach((question: any) => {
      const correctAnswersArray = question.get('correctAnswers') as FormArray;

      correctAnswersArray.controls.forEach((correctAnswer: any) => {
        const score = correctAnswer.get('correctAnswerScore')?.value || 0;
        totalScore += score;
      });
    });

    this.totalQuizScore = totalScore;
  }

  get questionsArray() {
    return this.quizForm.get('questions') as any;
  }

  createFalseAnswer(value: string, idquestion: string) {
    return this.formBuilder.group({
      falseAnswer: [value, [Validators.required]],
      idquestion: [idquestion, [Validators.required]],
    });
  }

  addFalseAnswer(question: FormGroup) {
    const idquestion = question.get('id')?.value;
    const falseAnswersArray = question.get('falseAnswers') as FormArray;
    falseAnswersArray.push(this.createFalseAnswer('', idquestion));
  }

  removeFalseAnswer(question: FormGroup, index: number) {
    const falseAnswersArray = question.get('falseAnswers') as FormArray;
    falseAnswersArray.removeAt(index);
  }

  addQuestion() {
    const newQuestion = this.createQuestionFormGroup();
    this.questionsArray.push(newQuestion);
  }

  removeQuestion(index: number) {
    this.questionsArray.removeAt(index);
  }

  createCorrectAnswer(value: string, score: number = 1, idquestion: string) {
    return this.formBuilder.group({
      correctAnswer: [value, [Validators.required]],
      correctAnswerScore: [score, [Validators.required, Validators.min(1)]],
      idquestion: [idquestion, [Validators.required]],
    });
  }

  addCorrectAnswer(question: FormGroup) {
    const idquestion = question.get('id')?.value;
    const correctAnswersArray = question.get('correctAnswers') as FormArray;
    correctAnswersArray.push(this.createCorrectAnswer('', 1, idquestion));
  }

  removeCorrectAnswer(question: FormGroup, index: number) {
    const correctAnswersArray = question.get('correctAnswers') as FormArray;
    correctAnswersArray.removeAt(index);
  }

  submitQuiz() {
    //if (this.quizForm.get('maxPoints')?.value === 0) return;

    // if(this.quizForm.get('maxPoints')?.value !== this.totalQuizScore) {
    //   this.toastrService.warning('Sumy punktów formularza nie są równe'); // TODO tlumaczenie
    //   return;
    // }

    if (this.quizForm.valid) {
      const formValues: QuizData = this.quizForm.value
      console.log(formValues);
      const mappedValues: QuizDto = QuizMapper.mapToQuizRegisterDto(formValues, this.currentJobOfferId, this.totalQuizScore);

      console.log('dane create', mappedValues)
      this.quizzesService.createQuizForJobAdvertisement(this.currentJobOfferId, mappedValues).subscribe(res => {
        console.log(res)
        if(res.isSuccess) {
          console.log('sukces')
          this.router.navigate(['/joboffer/'+this.currentJobOfferId])
        }
      });
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
