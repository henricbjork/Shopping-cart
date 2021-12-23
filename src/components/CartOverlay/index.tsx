import { FC, useEffect, useState } from 'react';

import CartItem from 'components/CartOverlay/CartItem';
import { CartItemType } from 'App';

type Props = {
  items?: CartItemType[];
  isOverlayOpen: boolean;
  setIsOverlayOpen: (arg0: boolean) => void;
  handleRemoveFromCart: (id: number, removeAllOfItem?: boolean) => void;
  handleAddToCart: (item: CartItemType) => void;
};

const CartOverlay: FC<Props> = ({
  handleAddToCart,
  handleRemoveFromCart,
  isOverlayOpen = false,
  items = [],
  setIsOverlayOpen,
}) => {
  const [totalCost, setTotalCost] = useState(0);

  const calculateTotalCost = (items: CartItemType[]): number => {
    return items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.amount * currentValue.price,
      0
    );
  };

  useEffect(() => {
    setTotalCost(calculateTotalCost(items));
  }, [items]);

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
      {items.length > 0 ? (
        <>
          {items.map((item) => {
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
