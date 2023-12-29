import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';
import { QuizModel } from 'src/app/shared/models/quiz';

@Component({
  selector: 'app-multi-choice-question',
  templateUrl: './multi-choice-question.component.html',
  styleUrls: ['./multi-choice-question.component.scss']
})
export class MultiChoiceQuestionComponent implements OnInit, AfterViewInit {

  @Input() colors!: string[];
  @Input() backgroundImages!: string[];
  @Input() quiz!: QuizModel;
  @Input() questionNumber!: number;
  @Input() mulitChoice: any;
  @Input() questionImage: string = `${images}/mockQuestion.png`;
  imgPlaceholder: string = `${images}/mockQuestion.png`;

  @Output() questionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('scrollTo') scrollTo!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  nextQuestion() {
    this.questionChanged.emit();
  }

}
