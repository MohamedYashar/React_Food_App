import { useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [CartIsShown, setCartIsShown] =useState(false);

  const showCartHandler =()=> setCartIsShown(true);
  
  const HideCartHandler =()=> setCartIsShown(false);

  
  return (
    <CartProvider>
      {CartIsShown && <Cart onClose={HideCartHandler} />}
      
      <Header onShowCart ={showCartHandler} />
       
       <main> <Meals/> </main>     
    
    </CartProvider>
  );
}

export default App;
