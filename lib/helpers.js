export function formatPrice(price) {
  const formatter = new Intl.NumberFormat('is-IS', {
    style: 'currency',
    currency: 'ISK',
  });

  return formatter.format(price);
}


export function validateInteger(num, min = 0, max = Infinity){
  return Number.isInteger(num) && min <=num && num <= max;
}


export function emptyElement(element){
  while (element.firstChild){
    element.removeChild(element.firstChild);
  }
}