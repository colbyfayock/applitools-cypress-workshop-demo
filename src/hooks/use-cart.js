import { useState, createContext, useContext, useEffect } from 'react';

const defaultCart = {
  products: {}
}

export const CartContext = createContext();

export function useCartState({ games }) {
  const [cart, updateCart] = useState(defaultCart);

  const cartItems = Object.keys(cart.products).map(key => {
    const game = games.find(({ id }) => `${id}` === `${key}`);

    return {
      ...game,
      ...cart.products[key],
      pricePerUnit: 60,
      price: 60
    }
  });

  const subtotal = cartItems.reduce((accumulator, { pricePerUnit, quantity }) => {
    return accumulator + ( pricePerUnit * quantity );
  }, 0);

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  /**
   * addToCart
   */

  function addToCart({ id }) {
    updateCart((prev) => {
      let cart = {...prev};

      if ( cart.products[id] ) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart;
    })
  }

  /**
   * checkout
   */

  function checkout() {
    console.log('Checking out!');
  }

  /**
   * updateItem
   */

  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cart = {...prev};

      if ( cart.products[id] ) {
        cart.products[id].quantity = quantity;
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart;
    })
  }

  return {
    cart,
    cartItems,
    subtotal,
    quantity,
    addToCart,
    checkout,
    updateItem
  }

}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}