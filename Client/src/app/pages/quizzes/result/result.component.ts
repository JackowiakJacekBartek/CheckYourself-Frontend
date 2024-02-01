import { Component, OnInit } from '@angular/core';
import { ResultService } from './result.service';
import { ActivatedRoute } from '@angular/router';
import { QuizResultDto } from 'src/app/shared/models/quizzes';
import { take } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  quizAttempt!: QuizResultDto;
  examPassed!: boolean;
  public resultId: number = this.route.snapshot.params['id'];

  constructor(protected resultService: ResultService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.resultService.getQuizAttemptResultById(this.resultId)
      .pipe(take(1))
      .subscribe(res => {
        this.quizAttempt = res.methodResult;
        this.examPassed = (this.quizAttempt.quizAttempt.totalparticipantscore / this.quizAttempt.quiz.totalscore!) * 100 >= this.quizAttempt.quiz.passingthreshold
      });
  }
}
