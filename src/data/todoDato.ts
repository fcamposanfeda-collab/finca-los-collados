/** Hide unpublished placeholders so Google never indexes “TODO_DATO”. */

export function containsTodoDato(text: string): boolean {
  return text.includes('TODO_DATO');
}

/** Drop sentences that still carry a TODO_DATO marker; keep confirmed copy. */
export function stripTodoDato(text: string): string {
  return text
    .split(/(?<=[.!?…])\s+/)
    .filter((sentence) => !containsTodoDato(sentence))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function visibleFaqItems<T extends { q: string; a: string }>(items: T[]): T[] {
  return items.flatMap((item) => {
    const q = stripTodoDato(item.q);
    const a = stripTodoDato(item.a);
    if (!q || !a) return [];
    return [{ ...item, q, a }];
  });
}
