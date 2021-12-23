import './App.css';

import CartOverlay from 'components/CartOverlay';
import { CartProvider } from 'contexts/CartContext';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <CartProvider>
      <Header
        setIsOverlayOpen={setIsOverlayOpen}
        isOverlayOpen={isOverlayOpen}
      />
      <CartOverlay
        isOverlayOpen={isOverlayOpen}
        setIsOverlayOpen={setIsOverlayOpen}
      />
      <Outlet />
      <div className="h-screen bg-yellow-500 flex justify-center items-center">
        Home page goes here
      </div>
    </CartProvider>
  );
};

export default App;
