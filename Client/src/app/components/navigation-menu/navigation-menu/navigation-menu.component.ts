import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {

  @Input() navMenuToggle;

  isQuizDropdownActive: boolean = false;

  constructor() { }

  public activateDropdown() {
    this.isQuizDropdownActive = !this.isQuizDropdownActive;
  }
  public getArrow() {
    return this.isQuizDropdownActive ? 'keyboard_arrow_up_outline' : 'keyboard_arrow_down_outline';
  }
}
