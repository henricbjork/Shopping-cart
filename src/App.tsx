import './App.css';

import { useEffect, useState } from 'react';

import CartIcon from 'components/CartIcon';
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

const cartFromLocalStorage: CartItemType[] = JSON.parse(
  localStorage.getItem('cart') || ''
);

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const [cartItems, setCartItems] =
    useState<CartItemType[]>(cartFromLocalStorage);
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const existsInCart = prev.some((item) => item.id === clickedItem.id);

      if (existsInCart) {
        return prev.map((item) => {
          if (item.id === clickedItem.id) {
            return { ...item, amount: item.amount + 1 };
          }

          return item;
        });
      }

      return [...cartItems, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number, removeAllOfItem = false) => {
    if (removeAllOfItem) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) => {
        return prev.map((item) => {
          if (item.id === id) {
            // Since we are checking the previous state, the previous amount of 1 is the current amount of 0
            if (item.amount === 1) {
              handleRemoveFromCart(item.id, true);
            } else {
              return { ...item, amount: item.amount - 1 };
            }
          }

          return item;
        });
      });
    }
  };

  useEffect(() => {
    setTotalItems(getTotalItems(cartItems));
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  return (
    <div className="bg-gray-50">
      <CartIcon
        styles="fixed right-3 top-3"
        amountOfItems={totalItems}
        handleClick={() => {
          setIsOverlayOpen(!isOverlayOpen);
        }}
      />
      <div className="grid grid-cols-4 gap-4 p-6">
        {data?.map((item) => {
          return (
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
      <CartOverlay
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        isOverlayOpen={isOverlayOpen}
        items={cartItems}
        setIsOverlayOpen={setIsOverlayOpen}
      />
    </div>
  );
};

export default App;
