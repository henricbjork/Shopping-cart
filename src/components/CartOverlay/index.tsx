import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import CartItem from 'components/CartOverlay/CartItem';

type Props = {
  isOverlayOpen: boolean;
  setIsOverlayOpen: (arg0: boolean) => void;
};

const CartOverlay: FC<Props> = ({
  isOverlayOpen = false,
  setIsOverlayOpen,
}) => {
  const { cartItems, handleRemoveFromCart, handleAddToCart, totalCost } =
    useContext(CartContext);

  return (
    <div
      className={`z-20 fixed top-0 ${
        isOverlayOpen ? 'right-0' : 'right-[-500px]'
      } h-screen bg-white w-[500px] overflow-scroll`}
    >
      <button
        onClick={() => {
          setIsOverlayOpen(false);
        }}
      >
        Close
      </button>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => {
            return (
              <CartItem
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                item={item}
                key={item.id}
              />
            );
          })}
          <p>Total: ${totalCost.toFixed(2)}</p>
        </>
      ) : (
        <p>Empty cart</p>
      )}
    </div>
  );
};

export default CartOverlay;
