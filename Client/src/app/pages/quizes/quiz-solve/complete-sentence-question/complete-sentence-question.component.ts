import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizModel } from 'src/app/shared/models/quiz';

@Component({
  selector: 'app-complete-sentence-question',
  templateUrl: './complete-sentence-question.component.html',
  styleUrls: ['./complete-sentence-question.component.scss']
})
export class CompleteSentenceQuestionComponent implements AfterViewInit {

  @Input() questionNumber!: number;
  @Input() quiz!: QuizModel;

  @Output() questionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('scrollTo') scrollTo!: ElementRef;

  constructor () { }

  ngAfterViewInit(): void {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  
  nextQuestion() {
    this.questionChanged.emit();
  }
}
