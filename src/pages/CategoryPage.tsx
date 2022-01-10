import { FC, useContext } from 'react';

import { CartContext } from 'contexts/CartContext';
import ProductCard from 'components/ProductCard';

const CategoryPage: FC = () => {
  const { data, isLoading, error } = useContext(CartContext);

  if (error) return <div>Something went wrong</div>;
  if (isLoading)
    return (
      <div className="h-screen bg-blue-600 flex justify-center items-center text-white">
        Loading...
      </div>
    );

  return data ? (
    <div className="pt-[100px] px-6">
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => {
          return <ProductCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">No products</div>
  );
};

export default CategoryPage;
