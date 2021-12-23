import { CartContext } from 'contexts/CartContext';
import { FC } from 'react';
import { useContext } from 'react';

type Props = {
  styles?: string;
  handleClick: () => void;
};

const CartIcon: FC<Props> = ({ handleClick = () => null, styles }) => {
  const { totalItems } = useContext(CartContext);
  return (
    <div
      className={`relative z-10 p-2 inline-block border border-solid ${styles}`}
    >
      <p className="absolute top-[-10px] right-[-10px] bg-red-500 text-white flex justify-center items-center rounded-full w-6 h-6">
        {totalItems}
      </p>
      <button onClick={handleClick}>CART</button>
    </div>
  );
};

export default CartIcon;
