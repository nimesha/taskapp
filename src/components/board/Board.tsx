import List from '../list/List';
import styles from './Board.module.css';

const Board = () => {
  return (
    <div className={styles.board}>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Board;
