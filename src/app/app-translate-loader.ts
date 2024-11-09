import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";

import { Observable, map } from "rxjs";

export class AppTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<unknown> {
    return this.http
      .get(`assets/i18n/${lang}.json`)
      .pipe(map((trans) => trans));
  }
}
