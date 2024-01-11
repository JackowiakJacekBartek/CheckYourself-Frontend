import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { AccountService } from 'src/app/shared/services/user-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {

  @Input() navMenuToggle;
  @Input() userID;

  @Output() navMenuToggleChange = new EventEmitter<boolean>();

  public isQuizDropdownActive: boolean = false;

  localStorage = localStorage;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<any>
  ) {}

  // Nasłuchiwanie na kliknięcie globalne
  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    // Jeśli kliknięcie nie wystąpiło wewnątrz komponentu NavigationMenuComponent, schowaj menu
    if (!this.isInsideComponent(event)) {
      this.closeMenu();
    }
  }

  openLogin() {
    this.router.navigate(['/user/' + localStorage.getItem('userID')]);
    this.closeMenu();
  }

  public activateDropdown() {
    this.isQuizDropdownActive = !this.isQuizDropdownActive;
  }

  public getArrow() {
    return this.isQuizDropdownActive ? 'keyboard_arrow_up_outline' : 'keyboard_arrow_down_outline';
  }

  public logout() {
    this.accountService.logout();
    this.closeMenu();
  }

  public closeMenu() {
    this.navMenuToggleChange.emit(false);
  }

  public changeLanguage() {
    if (this.translate.currentLang == 'pl') {
      this.translate.use('en');
      localStorage.setItem('selectedLanguage', 'en');
    } else {
      this.translate.use('pl');
      localStorage.setItem('selectedLanguage', 'pl');
    }
    this.dateAdapter.setLocale(localStorage.getItem('selectedLanguage'));
  }

  private isInsideComponent(event: Event): boolean {
    const clickedElement = event.target as HTMLElement;
    const navigationMenu = document.getElementById('navMenuId');

    return navigationMenu !== null && this.isDescendant(clickedElement, navigationMenu);
  }
  
  private isDescendant(el: HTMLElement, parentId: HTMLElement): boolean {
    return el.id === parentId.id || (parentId.contains(el) && parentId !== el) 
    || el.tagName === 'MAT-NAV-LIST' || el.closest('mat-nav-list') !== null;
  }
  
}
