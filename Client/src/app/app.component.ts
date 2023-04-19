import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, localeInterface } from './shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Check Yourself';
  constructor(private translate: TranslateService) {

    const userLanguage = navigator.language;
    
    function isLangSupported(lang: localeInterface) {
      return lang.locale === userLanguage.split('-')[0]
    }

    function setLanguage(langLocale: string) {
      translate.setDefaultLang(langLocale);
      translate.use(langLocale);
    }

    let language = LANGUAGES.find(isLangSupported)

    language? setLanguage(language.locale) : setLanguage('en');

    
  }


}
