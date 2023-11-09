import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/shared/services/user-service.service';

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

  constructor(private accountService: AccountService) { }

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
    this.navMenuToggleChange.emit(false)
  }
}
