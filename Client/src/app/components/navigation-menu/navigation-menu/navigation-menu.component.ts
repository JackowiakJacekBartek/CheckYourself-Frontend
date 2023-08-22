import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {

  @Input() navMenuToggle;

  constructor() { }

}
