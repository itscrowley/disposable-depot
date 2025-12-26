import { isOutOfStock } from "@/lib/stock";
import { sendStockAlert } from "@/lib/whatsapp";

// stock update ke baad
if (isOutOfStock(updatedProduct.stock)) {
  sendStockAlert(updatedProduct.name);
}
