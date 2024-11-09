import { Injectable } from '@angular/core';
import { SVGIcon } from '../models/icons/icon-model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RegisterIconService {
  constructor(
    private regIcon: MatIconRegistry,
    private domSanitizier: DomSanitizer,
  ) {}

  registerIcons(icons: SVGIcon[]) {
    for (const icon of icons) {
      this.regIcon.addSvgIcon(
        icon.iconName,
        this.domSanitizier.bypassSecurityTrustResourceUrl(icon.iconAsset),
      );
    }
  }
}
