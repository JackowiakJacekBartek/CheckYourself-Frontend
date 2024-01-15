import { Component } from '@angular/core';
import { ResultService } from './result.service';
import { ActivatedRoute } from '@angular/router';
import { QuizResultDto } from 'src/app/shared/models/quizzes';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  quizAttempt!: QuizResultDto;
  public resultId: number = this.route.snapshot.params['id'];

  constructor(protected resultService: ResultService, private route: ActivatedRoute) {

    resultService.getQuizAttemptResultById(this.resultId).subscribe(res => {
      this.quizAttempt = res.methodResult;
    });

  }
}
