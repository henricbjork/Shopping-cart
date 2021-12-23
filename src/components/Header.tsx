import CartIcon from 'components/CartIcon';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  setIsOverlayOpen: (arg0: boolean) => void;
  isOverlayOpen: boolean;
}

const Header: FC<Props> = ({ setIsOverlayOpen, isOverlayOpen }) => (
  <div className="fixed flex justify-between items-center px-6 py-4 border-b shadow-md bg-white w-full z-10">
    <Link to="/">Fakestore</Link>
    <Link to="/checkout">Checkout</Link>
    <Link to="/products">Shop</Link>
    <CartIcon
      handleClick={() => {
        setIsOverlayOpen(!isOverlayOpen);
      }}
    />
  </div>
);

export default Header;
