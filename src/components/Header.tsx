import { Link, useLocation } from 'react-router-dom';

import CartIcon from 'components/CartIcon';
import { FC } from 'react';

interface Props {
  setIsOverlayOpen: (arg0: boolean) => void;
  isOverlayOpen: boolean;
}

const Header: FC<Props> = ({ setIsOverlayOpen, isOverlayOpen }) => {
  const { pathname } = useLocation();
  const isCheckoutPage = pathname === '/checkout';

  return (
    <div className="fixed flex justify-between items-center px-6 py-4 border-b shadow-md bg-white w-full z-10">
      <Link to="/">Fakestore</Link>
      <Link to="/products">Shop</Link>
      {!isCheckoutPage && (
        <CartIcon
          handleClick={() => {
            setIsOverlayOpen(!isOverlayOpen);
          }}
        />
      )}
    </div>
  );
};

export default Header;
