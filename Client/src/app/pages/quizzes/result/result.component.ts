import { Component } from '@angular/core';
import { ResultService } from './result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  result!: any;

  constructor(protected resultService: ResultService, private route: ActivatedRoute) {
    resultService.getQuizResultById(1).subscribe(res => {
      this.result = res.methodResult;
      console.log('result', this.result, this.route.snapshot.params['id']);
    })
  }
}
