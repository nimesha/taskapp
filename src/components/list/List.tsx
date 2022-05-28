import Card from '../card/Card';
import styles from './List.module.css';
import { FaEdit } from 'react-icons/fa';

const List = () => {
  return (
    <div className={styles.list}>
      <header className={styles.list_header}>
        <div className={styles.title}>
          <h3>Start</h3>
          <FaEdit />
        </div>
        <p>3 Tasks</p>
      </header>
      <div className="list-content">
        <Card />
        <Card />
        <Card />
      </div>
      <footer className="list-footer">f</footer>
    </div>
  );
};

export default List;
