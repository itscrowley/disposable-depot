export function sendStockAlert(productName: string) {
  const message = `
⚠️ STOCK ALERT

Product: ${productName}
Status: Out of Stock
`;

  const phone = "91XXXXXXXXXX"; // tumhara number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  fetch(url);
}
