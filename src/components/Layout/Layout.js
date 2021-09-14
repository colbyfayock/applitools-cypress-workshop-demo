import Header from '@components/Header';
import Main from '@components/Main';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>{ children }</Main>
    </div>
  )
}

export default Layout;