import CartItem from 'components/CartOverlay/CartItem';
import { CartItemType } from 'App';

type Props = {
  items?: CartItemType[];
};

const CartOverlay: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items?.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default CartOverlay;
