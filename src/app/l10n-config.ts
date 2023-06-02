import { Injectable } from "@angular/core";
import { L10nConfig, L10nProvider, L10nTranslationLoader } from "angular-l10n";
import { Observable, from } from "rxjs";

export const l10nConfig: L10nConfig = {
    format: 'language-region',
    providers: [
      { name: 'app', asset: 'app' }
    ],
    cache: true,
    keySeparator: '.',
    defaultLocale: { language: 'es-ES', currency: 'EUR', timeZone: '*' },
    schema: [
      { locale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' } },
      { locale: { language: 'es-ES', currency: 'EUR', timeZone: '*' } }
    ]
  };
  
  @Injectable() export class TranslationLoader implements L10nTranslationLoader {
    public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
      const data = import(`./../l18n/${language}/${provider.asset}.json`);
      return from(data);
    }
  }