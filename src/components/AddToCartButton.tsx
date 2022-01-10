import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import { Product } from 'types/product';

interface Props {
  item: Product;
  styles?: string;
}

const AddToCartButton: FC<Props> = ({ item, styles }) => {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <button
      className={`bg-black text-white ${styles}`}
      onClick={() => handleAddToCart(item)}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
