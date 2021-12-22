import { FC } from 'react';

type Props = {
  amountOfItems: number;
  styles: string;
  handleClick: () => void;
};

const CartIcon: FC<Props> = ({
  amountOfItems = 0,
  handleClick = () => null,
  styles,
}) => {
  return (
    <div
      className={`z-10 p-4 border border-solid border-black bg-white ${styles}`}
    >
      <p className="absolute top-[-10px] right-[-10px] bg-red-500 text-white flex justify-center items-center rounded-full w-6 h-6">
        {amountOfItems}
      </p>
      <button onClick={handleClick}>CART</button>
    </div>
  );
};

export default CartIcon;
