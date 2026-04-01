const thbFormatter = new Intl.NumberFormat("en-US");

export function formatTHB(value: number): string {
  return `฿${thbFormatter.format(Math.round(value))}`;
}

export function formatNumber(value: number): string {
  return thbFormatter.format(Math.round(value));
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatROAS(value: number): string {
  return `${value.toFixed(1)}x`;
}
