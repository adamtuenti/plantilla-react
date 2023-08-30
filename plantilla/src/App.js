import React from 'react';
import RouterPage from './router';
import Header from './share/header/header';
import { CartProvider } from "./hooks/useContext";

function App() {
  return (
    <div className="main-container">
      <CartProvider>
        <Header />
        <RouterPage />
      </CartProvider>
    </div>
  );
}

export default App;
