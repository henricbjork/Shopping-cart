import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import CartItem from 'components/CartOverlay/CartItem';

const CheckoutPage: FC = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px]">
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CheckoutPage;
