import { Component, OnInit } from '@angular/core';
import { ResultService } from './result.service';
import { ActivatedRoute } from '@angular/router';
import { QuizResultDto } from 'src/app/shared/models/quizzes';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  quizAttempt!: QuizResultDto;
  public resultId: number = this.route.snapshot.params['id'];

  constructor(protected resultService: ResultService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.resultService.getQuizAttemptResultById(this.resultId)
      .pipe(take(1))
      .subscribe(res => {
        this.quizAttempt = res.methodResult;
        // this.logResults();
      });
  }

  logResults() {
    console.log(`Total Participant Score: ${this.quizAttempt.quizAttempt.totalparticipantscore}`);
    console.log(`Total Score: ${this.quizAttempt.quiz.totalscore}`);
  }

  get resultMessage(): string {
    return this.quizAttempt.quizAttempt.totalparticipantscore >= this.quizAttempt.quiz.totalscore!
      ? 'Quiz.Passed'
      : 'Quiz.Failed';
  }

  get resultColor(): string {
    return this.quizAttempt.quizAttempt.totalparticipantscore >= this.quizAttempt.quiz.totalscore!
      ? '#00A993'
      : '#EB4335';
  }
}
