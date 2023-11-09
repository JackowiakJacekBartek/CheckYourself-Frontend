import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LANGUAGES, localeInterface} from './shared/constants/constants';
import {DateAdapter} from '@angular/material/core';
import {IconComponent} from "./components/icon/icon.component";
import {IconDto} from "./shared/models/iconDto";
import {
  addtool,
  androidstudio,
  angularjs,
  ansic, arduino, cplus, csharp,
  css3, discordjs,
  fbIcon, giticon,
  html,
  instagram, java, jenkins, jira, jsicon,
  linkedin, linuxicon,
  pin, python, react,
  twitter, typescripticon, unrealengine,
  user, windows
} from "./shared/constants/icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Check Yourself';
  icons!: IconDto[];
  public navMenuToggle: boolean = false;
  public userID: string | null = null;

  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<any>, public iconComponent: IconComponent) {

    this.icons = [
      fbIcon, twitter, instagram, linkedin, pin, user, html, css3, angularjs, ansic, csharp, cplus, java, python, jsicon, discordjs, androidstudio, react, unrealengine, arduino, addtool, typescripticon, jenkins, giticon, jira, windows, linuxicon
    ];

    this.icons.map(icon => iconComponent.putIcon(icon.name, icon.path));

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

    language ? setLanguage(language.locale) : setLanguage('en');


  }

  public sidenavClicked() {
    this.userID = localStorage.getItem('userID');
    this.navMenuToggle = !this.navMenuToggle;
  }

}
