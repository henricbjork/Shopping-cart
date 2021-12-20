import './App.css';

import { useEffect, useState } from 'react';

import CartOverlay from 'components/CartOverlay';
import Item from 'components/ProductCard';
import { useQuery } from 'react-query';

export type CartItemType = {
  amount: number;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
};

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType): void => {
    setCartItems((prevState) => [...prevState, { ...clickedItem }]);
  };

  const handleRemoveFromCart = () => null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
        {data?.map((item) => {
          return (
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
      <CartOverlay items={cartItems} />
    </>
  );
};

export default App;
