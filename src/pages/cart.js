import Head from 'next/head';
import Link from 'next/link';

import { useCart } from '@hooks/use-cart.js';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/pages/Cart.module.scss'

export default function Cart() {
  const { cartItems } = useCart();
  return (
    <Layout>
      <Head>
        <title>Cart - Video Game Store</title>
        <meta name="description" content="Your games ready to be delivered!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Cart</h1>

        <div className={styles.cart}>
          <>
            {cartItems.length > 0 && (
              <>
                <ul id="cart-items" className={styles.cartItems}>
                  <li className={`${styles.cartItem} ${styles.cartItemsHeader}`}>
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                  </li>
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
                  <button className={styles.cartCheckoutButton}>Continue to Checkout</button>
                </p>
              </>
            )}

            {cartItems.length === 0 && (
              <p className={`${styles.cartCheckout} ${styles.cartCheckoutNoItems}`}>
                <Link href="/">
                  <a className={styles.cartCheckoutButton}>
                    Continue Shopping
                  </a>
                </Link>
              </p>
            )}
          </>
        </div>

      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&sort=original_release_date:desc&filter=original_release_date:2016-01-01|2021-05-17&platforms=145,146&field_list=id,name,image&limit=12`);
  const { results } = await response.json();
  return {
    props: {
      games: results.map(game => {
        return {
          ...game,
          price: 60
        }
      })
    }
  };
}