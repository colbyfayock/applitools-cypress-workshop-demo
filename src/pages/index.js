import Head from 'next/head'
import Link from 'next/link'

import { useGames } from '@hooks/use-games';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Header from '@components/Header';

import styles from '@styles/pages/Home.module.scss'

export default function Home() {
  const { games } = useGames();
  return (
    <Layout>
      <Head>
        <title>Video Game Store</title>
        <meta name="description" content="Your favorite games delivered!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className="sr-only">Video Game Store</h1>

        <h2 className="sr-only">Available Games</h2>

        <ul id="games" className={styles.grid}>
          {games.map(({ name, image, id }) => {
            return (
              <li id={`game-${id}`} key={id} className={styles.card}>
                <Link href={`/games/${id}`}>
                  <a>
                    <span className={styles.cardImage} style={{
                      backgroundImage: `url(${image.original_url})`
                    }}>
                      <span className="sr-only">{name} Cover</span>
                    </span>
                    <h2 className={styles.cardTitle}>{ name }</h2>
                    <p className={styles.cardPrice}>
                      $60.00
                    </p>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
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