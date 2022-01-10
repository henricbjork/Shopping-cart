import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import { Product } from 'types/product';

type Props = {
  item: Product;
};

const CartItem: FC<Props> = ({ item }) => {
  const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext);

  return (
    <div className="flex h-[150px] p-2">
      <img src={item.image} alt={item.title} className="w-20 object-contain" />
      <div className="flex-col">
        <p>{item.title}</p>
        <p>${item.price}</p>
        <p>Total: ${(item.price * item.amount).toFixed(2)}</p>
        <div className="flex ml-4">
          <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
          <p className="p-4">{item.amount}</p>
          <button onClick={() => handleAddToCart(item)}>+</button>
        </div>
      </div>
      <button onClick={() => handleRemoveFromCart(item.id, true)}>
        remove from cart
      </button>
    </div>
  );
};

export default CartItem;
