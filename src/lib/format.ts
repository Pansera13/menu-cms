const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateTime = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const time = new Intl.DateTimeFormat('pt-BR', {
  timeStyle: 'short',
});

export function formatCurrency(value: number | string) {
  return currency.format(Number(value));
}

export function formatDateTime(value: string) {
  return dateTime.format(new Date(value));
}

export function formatTime(value: string) {
  return time.format(new Date(value));
}
