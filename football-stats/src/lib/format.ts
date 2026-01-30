export function formatNumber(n: number) {
  return new Intl.NumberFormat().format(n)
}

export function formatDecimal(n: number, digits = 1) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n)
}

export function formatDateShort(isoDate: string) {
  // isoDate: YYYY-MM-DD
  const [y, m, d] = isoDate.split('-').map((x) => Number(x))
  const dt = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1))
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
  }).format(dt)
}

