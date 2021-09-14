import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import { useCart } from '@hooks/use-cart.js';
import { useGames } from '@hooks/use-games.js';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const { subtotal, cartItems } = useCart();

  return (
    <div>
      <header className={styles.header}>
        <Container className={styles.headerContainer}>
          <p className={styles.title}>
            <Link href="/">
              <a>
                Video Game Store
              </a>
            </Link>
          </p>
          <div id="cart" className={styles.cart}>
            <p id="cart-subtotal" className={styles.cartSubtotal}>
              <Link href="/cart">
                <a>
                  <FaShoppingCart className={styles.cartIcon} />
                  ${subtotal.toFixed(2)}
                </a>
              </Link>
            </p>
            {cartItems.length > 0 && (
              <div id="cart-menu" className={styles.cartMenu}>
                <ul id="cart-items" className={styles.cartItems}>
                  {cartItems.map(game => {
                    return (
                      <li key={game.id} className={styles.cartItem}>
                        <p>{ game.name }</p>
                        <p>${ game.price.toFixed(2) }</p>
                        <p>{ game.quantity }</p>
                      </li>
                    )
                  })}
                </ul>
                <p className={styles.cartCheckout}>
                  <Link href="/cart">
                    <a id="cart-button" className={styles.cartCheckoutButton}>
                      Check Out
                    </a>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </Container>
      </header>
      <nav className={styles.nav}>
        <Container>
          <ul className={styles.navLinks}>
            <li>
              <a href="#">
                Xbox Series X
              </a>
            </li>
            <li>
              <a href="#">
                Playstation 5
              </a>
            </li>
            <li>
              <a href="#">
                Nintendo Switch
              </a>
            </li>
            <li>
              <a href="#">
                PC
              </a>
            </li>
          </ul>
        </Container>
      </nav>
    </div>
  )
}

export default Header;