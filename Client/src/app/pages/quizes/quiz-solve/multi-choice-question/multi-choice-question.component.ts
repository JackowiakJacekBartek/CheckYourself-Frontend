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
  @Input() questionImage: string = `${images}/mockQuestion.png`;
  imgPlaceholder: string = `${images}/mockQuestion.png`;

  @Output() questionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('scrollTo') scrollTo!: ElementRef;

  public pickedOptions: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public options(option: any): any[] {
    return [...option.answers.incorrect, ...option.answers.correct];
  }

  public toggleChoice(option: string) {
    this.pickedOptions.includes(option) ? this.unToggleChoice(option) : this.pickedOptions.push(option);
  }

  private unToggleChoice(choice: string) {
    this.pickedOptions.splice(this.pickedOptions.indexOf(choice), 1);
  }

  public isSelected(option: string): boolean {
    return this.pickedOptions.includes(option)
  }

  nextQuestion(option: any) {
    this.questionChanged.emit(option.answers.incorrect.some(r => this.pickedOptions.includes(r)));
    this.pickedOptions = [];
  }

}
