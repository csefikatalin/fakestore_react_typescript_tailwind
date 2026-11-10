
import ProductsCard from './ProductsCard'
import { useProductContext } from '../contexts/ProductContext'

function ProductsCards() {
  const { products, load, error } = useProductContext();

  if (load) {
    return (
      <p className="text-center text-lg text-gray-500 py-12">
        Termékek betöltése...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Termékeink
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductsCard
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsCards;
