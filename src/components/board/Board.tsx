import List from '../list/List';
import styles from './Board.module.css';
import { useListContext } from '../../hooks/useListContext';
import { List as ListType } from '../../types/List';

const Board = () => {
  const { list } = useListContext();
  return (
    <div className={styles.board}>
      {list &&
        list.map((item: ListType) => (
          <List isNew={false} key={item?.id} listItem={item} />
        ))}
      <List isNew={true} />
    </div>
  );
};

export default Board;
