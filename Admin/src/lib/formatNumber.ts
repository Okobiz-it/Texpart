export function formatBadgeCount(count?: number | null): string {
  if (!count || count <= 0) return "0";
  if (count >= 1_000_000) {
    const val = count / 1_000_000;
    return val >= 10 ? `${Math.floor(val)}M` : `${val.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1_000) {
    const val = count / 1_000;
    return val >= 10 ? `${Math.floor(val)}k` : `${val.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return count.toString();
}
