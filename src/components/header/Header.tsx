import styles from './Header.module.css';

const Header = () => {
  return (
    <>
      <header
        className={[styles['border-bottom'], styles['main-header']].join(' ')}
      >
        <div className={styles.wrap}>
          <nav className={styles.main_nav}>
            <div className={styles.logo}>Taskey</div>
            <div className="main-nav">
              <ul>
                <li>Dashboard</li>
                <li>Profile</li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
