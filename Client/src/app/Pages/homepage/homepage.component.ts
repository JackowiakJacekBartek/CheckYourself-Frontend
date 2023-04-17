import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  constructor(private translate: TranslateService) { }


  public changeLanguage() {
    if (this.translate.currentLang == "en") {
      this.translate.use('pl');
    } else {
      this.translate.use('en');
    }
  }
}
