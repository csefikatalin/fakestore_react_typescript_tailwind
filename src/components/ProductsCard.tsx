
import type { ProductType } from '../types/ProductType'

interface ProductProps {
  product: ProductType
}

function ProductsCard({ product }: ProductProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">

      <div className="h-56 p-6 flex items-center justify-center bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">

        <p className="text-sm text-gray-500 mb-2">
          {product.category}
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-2xl font-bold text-blue-700 mt-auto mb-4">
          {product.price.toFixed(2)} $
        </p>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Kosárba
        </button>

      </div>
    </article>
  )
}

export default ProductsCard
