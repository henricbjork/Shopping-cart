import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import Item from 'components/ProductCard';

const CategoryPage: FC = () => {
  const { data, isLoading, error, handleAddToCart } = useContext(CartContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="pt-[100px] px-6">
      <div className="grid grid-cols-4 gap-4">
        {data?.map((item) => {
          return (
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
