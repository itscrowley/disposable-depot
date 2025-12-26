import { isOutOfStock } from "@/lib/stock";

export default function ProductCard({ product }) {
  return (
    <div className="relative">
      <img src={product.images[0]} className="aspect-square object-cover" />

      {isOutOfStock(product.stock) && (
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 text-xs rounded">
          Out of Stock
        </span>
      )}

      <p className="mt-2">{product.name}</p>
    </div>
  );
}
