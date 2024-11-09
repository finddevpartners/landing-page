import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import {
  provideClientHydration,
  withHttpTransferCacheOptions,
} from "@angular/platform-browser";
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from "@angular/common/http";
import {
  BrowserAnimationsModule,
  provideAnimations,
} from "@angular/platform-browser/animations";
import { TranslationModule } from "./pages/shared/services/translation-service/translation.module";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      })
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      BrowserAnimationsModule,
      HttpClientModule,
      TranslationModule,
    ]),
    provideAnimations(),
  ],
};
