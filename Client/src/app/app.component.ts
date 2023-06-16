import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES, localeInterface } from './shared/constants/constants';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Check Yourself';
  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<any>) {

    const userLanguage = navigator.language;
    
    function isLangSupported(lang: localeInterface) {
      return lang.locale === userLanguage.split('-')[0]
    }

    function setLanguage(langLocale: string) {
      let defaultLanguage = localStorage.getItem('selectedLanguage');

      translate.setDefaultLang(defaultLanguage ? defaultLanguage : langLocale);
      translate.use(defaultLanguage ? defaultLanguage : langLocale);
      dateAdapter.setLocale(localStorage.getItem('selectedLanguage'));
    }

    let language = LANGUAGES.find(isLangSupported)

    language? setLanguage(language.locale) : setLanguage('en');

    
  }


}
