import { APP_INITIALIZER, NgModule } from "@angular/core";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { AppTranslateLoader } from "../../../../app-translate-loader";
import { firstValueFrom } from "rxjs";
import { LanguageEnum } from "../../../../utils/enum/language-enum";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang(LanguageEnum.EN);
    return firstValueFrom(translate.use(LanguageEnum.EN));
  };
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    },
  ],
  exports: [TranslateModule],
})
export class TranslationModule {}
