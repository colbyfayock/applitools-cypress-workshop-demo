import { CartContext, useCartState } from '@hooks/use-cart.js';
import { GamesContext, useGamesState } from '@hooks/use-games.js';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const { games } = pageProps;
  const cart = useCartState({ games });
  return (
    <GamesContext.Provider value={{ games }}>
      <CartContext.Provider value={cart}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </GamesContext.Provider>
  );
}

export default MyApp
