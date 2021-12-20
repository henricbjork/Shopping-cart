import { CartItemType } from 'App';
import { FC } from 'react';

type Props = {
  item: CartItemType;
};

const CartItem: FC<Props> = ({ item }) => {
  return (
    <div>
      <p>{item.title}</p>
      <p>{item.price}</p>
      <p>{item.amount}</p>
      <img src={item.image} alt={item.title} />
    </div>
  );
};

export default CartItem;
