export function formatCurrency(value) {
  //Convert to vietnam Đồng
  const costPizza = value * 24000;
  return new Intl.NumberFormat('vn', {
    style: 'currency',
    currency: 'VND',
  }).format(costPizza);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('vn', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}
