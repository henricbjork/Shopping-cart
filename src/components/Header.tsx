import CartIcon from 'components/CartIcon';
import { FC } from 'react';

interface Props {
  amountOfItems: number;
  setIsOverlayOpen: (arg0: boolean) => void;
  isOverlayOpen: boolean;
}

const Header: FC<Props> = ({
  amountOfItems,
  setIsOverlayOpen,
  isOverlayOpen,
}) => {
  return (
    <div className="fixed flex justify-between items-center px-6 py-4 border-b shadow-md bg-white w-full z-10">
      <p>Fakestore</p>
      <CartIcon
        amountOfItems={amountOfItems}
        handleClick={() => {
          setIsOverlayOpen(!isOverlayOpen);
        }}
      />
    </div>
  );
};

export default Header;
