import { FC, useState } from 'react';
import { ReactNode, createContext } from 'react';

import { useEffect } from 'react';
import { useQuery } from 'react-query';

interface Props {
  children: ReactNode;
}

export interface CartItemType {
  amount: number;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}

interface Context {
  data: CartItemType[] | undefined;
  cartItems: CartItemType[];
  isLoading: boolean;
  error: unknown;
  totalCost: number;
  totalItems: number;
  handleAddToCart: (clickedItem: CartItemType) => void;
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

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
};

const storedCart: CartItemType[] = JSON.parse(
  localStorage.getItem('cart') || ''
);

const CartProvider: FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const [cartItems, setCartItems] = useState(storedCart as CartItemType[]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculateTotalCost = (items: CartItemType[]): number => {
    return items.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.amount * currentValue.price,
      0
    );
  };

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
    setTotalCost(calculateTotalCost(cartItems));
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
