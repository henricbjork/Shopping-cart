import { CartItemType } from 'App';
import { FC } from 'react';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <div className="bg-white border-2 rounded-sm overflow-hidden">
      <div className="aspect-[3/4] p-12 flex items-center bg-white overflow-hidden relative">
        <img src={item.image} alt={item.title} />
        <button
          className="absolute top-1 right-1 p-2 bg-black text-white"
          onClick={() => {
            handleAddToCart(item);
          }}
        >
          Add
        </button>
      </div>
      <div className="py-2 px-2">
        <h3 className="h-[3.5rem] overflow-hidden text-xl font-medium mb-2">
          {item.title}
        </h3>
        <h3 className="text-xl font-semibold mb-2">${item.price}</h3>
      </div>
    </div>
  );
};

export default Item;
