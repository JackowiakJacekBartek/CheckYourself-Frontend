import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  private answerModel: {id: number, answer: string}[] = [];
  private madeError: boolean = false;
  constructor () { }

  ngAfterViewInit(): void {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  public options(option: any): any[] {
    return [...option.answers.incorrect, ...option.answers.correct];
  }

  public optionChosen(index: number, option: string) {
    this.answerModel.forEach(op => {
      let filteredIndex = this.answerModel.filter((id) => id.id === index);
      if(op.id === index) this.answerModel.splice(this.answerModel.indexOf(filteredIndex[0]), 1);
    })

    this.answerModel.push({
      id: index,
      answer: option
    });
  }
  
  nextQuestion(option: any) {
    this.answerModel.forEach(answer => {
      if (option.sentences[answer.id].answers.incorrect.some(r => r === answer.answer)) this.madeError = true;
    });
    (this.answerModel.length < option.sentences.length || this.madeError) ? this.questionChanged.emit(true) : this.questionChanged.emit(false);
    this.madeError = false;
  }
}
