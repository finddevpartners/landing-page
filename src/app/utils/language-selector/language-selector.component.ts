import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { TranslationService } from "../../pages/shared/services/translation-service/translation.service";
import { LanguageEnum } from "../enum/language-enum";

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  templateUrl: "./language-selector.component.html",
  styleUrl: "./language-selector.component.css",
})
export class LanguageSelectorComponent {
  selectedLanguage = this.ts.selectedLanguage();

  LanguageEnum = LanguageEnum; // Expose enum to template

  constructor(private ts: TranslationService) {
    this.ts.setDefaultLanguage();
  }

  changeLanguage(event: any) {
    this.ts.setLanguage(event.value);
  }

  isSelected(language: string): boolean {
    return this.ts.selectedLanguage() === language;
  }
}
