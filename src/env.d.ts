/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    locale: import('./i18n/config').Locale;
    pageKey: import('./i18n/routes').PageKey;
  }
}
