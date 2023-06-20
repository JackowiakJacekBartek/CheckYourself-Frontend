import {Component, Injectable} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn:'root'
})
export class IconComponent{
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  }

  putIcon(iconName: string, iconPath: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath)
    );
  }

}
