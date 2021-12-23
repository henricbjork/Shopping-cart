import { FC, useState } from 'react';
import { ReactNode, createContext } from 'react';

import { Product } from 'types/product';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

const getProducts = async (): Promise<Product[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
};

const storedCart: Product[] = JSON.parse(localStorage.getItem('cart') || '');

interface Context {
  data: Product[] | undefined;
  cartItems: Product[];
  isLoading: boolean;
  error: unknown;
  totalCost: number;
  totalItems: number;
  handleAddToCart: (clickedItem: Product) => void;
  handleRemoveFromCart: (id: number, removeAllOfItem?: boolean) => void;
}

const CartContext = createContext<Context>({
  data: undefined,
  cartItems: [],
  isLoading: true,
  error: false,
  totalCost: 0,
  totalItems: 0,
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
});

interface Props {
  children: ReactNode;
}

const CartProvider: FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useQuery<Product[]>(
    'products',
    getProducts
  );

  const [cartItems, setCartItems] = useState(storedCart as Product[]);
  const [{ totalItems, totalCost }, setTotals] = useState({
    totalItems: 0,
    totalCost: 0,
  });

  const calculateTotalCost = (items: Product[]): number => {
    return items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.amount * currentValue.price,
      0
    );
  };

  const getTotalItems = (items: Product[]) => {
    return items.reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );
  };

  const handleAddToCart = (clickedItem: Product) => {
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
    setTotals({
      totalItems: getTotalItems(cartItems),
      totalCost: calculateTotalCost(cartItems),
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    data,
    cartItems,
    isLoading,
    error,
    totalCost,
    totalItems,
    handleAddToCart,
    handleRemoveFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
