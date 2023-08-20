import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-complete-sentence-question',
  templateUrl: './complete-sentence-question.component.html',
  styleUrls: ['./complete-sentence-question.component.scss']
})
export class CompleteSentenceQuestionComponent implements AfterViewInit {

  @Input() questionNumber: boolean = true;

  @Output() questionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('scrollTo') scrollTo!: ElementRef;

  constructor () { }

  ngAfterViewInit(): void {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  
  nextQuestion() {
    this.questionNumber = !this.questionNumber;
    this.questionChanged.emit(this.questionNumber);
  }
}
