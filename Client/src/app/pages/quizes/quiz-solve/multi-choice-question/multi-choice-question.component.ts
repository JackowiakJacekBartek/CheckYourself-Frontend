import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-multi-choice-question',
  templateUrl: './multi-choice-question.component.html',
  styleUrls: ['./multi-choice-question.component.scss']
})
export class MultiChoiceQuestionComponent implements OnInit, AfterViewInit {

  @Input() colors!: string[];
  @Input() mulitChoice: any;
  @Input() questionImage: string = `${images}/no-image.svg`;
  @Input() questionNumber: boolean = true;

  @Output() questionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('scrollTo') scrollTo!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  nextQuestion() {
    this.questionNumber = !this.questionNumber;
    this.questionChanged.emit(this.questionNumber);
  }

}
