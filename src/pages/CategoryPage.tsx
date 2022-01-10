import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import Item from 'components/ProductCard';

const CategoryPage: FC = () => {
  const { data, isLoading, error } = useContext(CartContext);

  if (error) return <div>Something went wrong</div>;
  if (isLoading)
    return (
      <div className="h-screen bg-blue-600 flex justify-center items-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="pt-[100px] px-6">
      <div className="grid grid-cols-4 gap-4">
        {data?.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
