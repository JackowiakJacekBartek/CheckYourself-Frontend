import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { EditUserProfileService } from '../../edit-userpage/edit-user-profile/edit-user-profile.service';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { QuizDto } from 'src/app/shared/models/quizzes';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.scss']
})
export class QuizCreateComponent {

  public currentJobOfferId: number = +this.route.snapshot.params['id'];
  // quiz!: QuizDto;
  quizForm: FormGroup;
  
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
      quizName: ['', [Validators.required]],
      maxDuration: [30, [Validators.required, Validators.min(1)]],
      maxPoints: [10, [Validators.required, Validators.min(1)]],
      questions: this.formBuilder.array([
        this.createQuestionFormGroup()
      ])
    });
    // quizzesService.getQuizByIdJobAdvertisement(50).subscribe(res => {
    //   this.quiz = res.methodResult;
    // })
  }

  createQuestionFormGroup() {
    return this.formBuilder.group({
      questionContent: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]],
      falseAnswer: ['', [Validators.required]]
    });
  }

// Getter for easy access to the questions array
get questionsArray() {
  return this.quizForm.get('questions') as any;
}

// Add a new question to the form
addQuestion() {
  this.questionsArray.push(this.createQuestionFormGroup());
}

// Remove a question from the form
removeQuestion(index: number) {
  this.questionsArray.removeAt(index);
}

// Submit the quiz form
submitQuiz() {
  if (this.quizForm.valid) {
    // Handle form submission (e.g., send data to backend)
    console.log(this.quizForm.value);
  } else {
    // Display validation errors
    console.log('Form is invalid. Please fill in all required fields.');
  }
}

}
