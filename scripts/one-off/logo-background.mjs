export function isLogoBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  if (max < 12) return true;
  if (g > r + 6 && g > b + 6) return false;
  if (max < 28 && max - min < 10) return true;

  return false;
}
