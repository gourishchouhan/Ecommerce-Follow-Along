import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative pb-[56.25%]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-orange-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;