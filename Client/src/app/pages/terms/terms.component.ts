import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  terms!: string[];

  constructor(protected translate: TranslateService){
    const text = this.translate.instant('Terms');
    
    this.terms = text.split('§');
    console.log(text)
    console.log(this.terms)
  }
}
