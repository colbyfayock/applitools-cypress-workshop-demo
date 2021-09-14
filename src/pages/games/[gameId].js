import Head from 'next/head';
import Link from 'next/link';

import { useCart } from '@hooks/use-cart.js';

import Layout from '@components/Layout';
import Container from '@components/Container';

import styles from '@styles/pages/Game.module.scss'

export default function Game({ game }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      id: game.id
    });
  }

  return (
    <Layout>
      <Head>
        <title>{ game.name } - Video Game Store</title>
        <meta name="description" content={game.deck} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={styles.gameContainer}>
        <div className={styles.gameImage}>
          <img src={game.image.original_url} alt={`${game.name} Cover`} />
        </div>
        <div className={styles.gameDetails}>
          <h1 id="game-name" className={styles.gameTitle}>{ game.name }</h1>
          <p className={styles.gameDescription}>
            {game.deck}
          </p>
          <p id="game-price" className={styles.gamePrice}>
            ${game.price.toFixed(2)}
          </p>
          <p className={styles.gameBuy}>
            <button id="button-add-to-cart" className={styles.gameBuyButton} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </p>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const gameResponse = await fetch(`https://www.giantbomb.com/api/game/${params.gameId}/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&sort=original_release_date:desc&filter=original_release_date:2016-01-01|2021-05-17&platforms=145,146&field_list=name,image,deck,id`);
  const { results: game } = await gameResponse.json();

  const gamesResponse = await fetch(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&sort=original_release_date:desc&filter=original_release_date:2016-01-01|2021-05-17&platforms=145,146&field_list=id,name,image&limit=12`);
  const { results: games } = await gamesResponse.json();

  return {
    props: {
      games,
      game: {
        ...game,
        price: 60
      }
    }
  }
}

export async function getStaticPaths() {
  const response = await fetch(`https://www.giantbomb.com/api/games/?api_key=${process.env.GIANT_BOMB_API_KEY}&format=json&sort=original_release_date:desc&filter=original_release_date:2016-01-01|2021-05-17&platforms=145,146&field_list=id&limit=12`);
  const { results } = await response.json();

  const paths = results.map(({ id }) => {
    return {
      params: {
        gameId: `${id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}