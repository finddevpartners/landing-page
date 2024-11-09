import { Injectable, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageEnum } from "../../../../utils/enum/language-enum";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private readonly isLocalStorageDefined = typeof localStorage !== "undefined";
  selectedLanguage = signal<string>("");
  constructor(private translate: TranslateService) {}

  instant(key: string): string {
    return this.translate.instant(key);
  }

  setDefaultLanguage() {
    if (this.isLocalStorageDefined) {
      const storedLanguage = localStorage.getItem("Language");
      if (storedLanguage) {
        this.selectedLanguage.set(storedLanguage);
        this.translate.use(storedLanguage);
      } else {
        this.translate.setDefaultLang(LanguageEnum.EN);
        localStorage.setItem("Language", LanguageEnum.EN);
      }
    }
  }

  setLanguage(language: string) {
    this.selectedLanguage.set(language);
    this.translate.use(language);
    this.isLocalStorageDefined
      ? localStorage.setItem("Language", language)
      : "";
  }
}
