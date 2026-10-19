import { AsyncLocalStorage } from 'node:async_hooks';
import type { Locale } from './config';
import type { PageKey } from './routes';

export type RenderI18n = {
  locale: Locale;
  pageKey: PageKey;
};

const store = new AsyncLocalStorage<RenderI18n>();

export function runWithI18n<T>(context: RenderI18n, fn: () => T): T {
  return store.run(context, fn);
}

export function getRenderI18n(): RenderI18n | undefined {
  return store.getStore();
}
