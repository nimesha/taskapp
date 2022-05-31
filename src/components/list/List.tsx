import { useState } from 'react';
import Card from '../card/Card';
import styles from './List.module.css';
import { FaEdit } from 'react-icons/fa';
import { useListContext } from '../../hooks/useListContext';
import { useTaskContext } from '../../hooks/useTaskContext';
import Modal from '../modal/Modal';
import CardDetails from '../card/card-details/CardDetails';
import { ActionType, List as ListType } from '../../types/List';
import { Task } from '../../types/Task';

type Props = {
  isNew: boolean;
  listItem?: ListType;
};

const List: React.FC<Props> = ({ isNew, listItem }) => {
  const [title, setTitle] = useState<string>('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string>('');
  const { list, dispatch } = useListContext();
  const { taskCard } = useTaskContext();

  const Toggle = () => setModal(!modal);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setError('List Name is required');
      return true;
    }
    const items = list.find((item: ListType) => item.title === title.trim());
    if (items) {
      console.log('df');
      setError('Title Already exists');
      return true;
    }

    dispatch({
      type: ActionType.ADD_LIST,
      payload: {
        title: title.trim(),
        value: title.replace(/[^a-zA-Z0-9]/g, ''),
      },
    });
    setError('');
    setTitle('');
  };

  return (
    <div className={styles.list}>
      {isNew ? (
        <header className={styles.list_header}>
          <div className={styles.title}>
            <form onSubmit={handleSubmit}>
              <label className={styles.element}>
                <input
                  type="input"
                  placeholder="Add another list"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <button className={styles.input_submit} type="submit">
                Save
              </button>
            </form>
          </div>
          {error && <p className="error">{error}</p>}
        </header>
      ) : (
        <header className={styles.list_header}>
          <div className={styles.title}>
            <h3>{listItem?.title}</h3>
            <FaEdit />
          </div>
        </header>
      )}

      {!isNew && (
        <div>
          {taskCard &&
            taskCard
              .filter((item: { state: Task }) => item.state === listItem?.value)
              .map((item: { id: string }) => (
                <Card key={item.id} task={item} />
              ))}
        </div>
      )}

      <div className={styles.footer}>
        {!isNew && (
          <>
            <button className={styles.close} onClick={() => Toggle()}>
              Add New Task
            </button>
            <Modal show={modal} close={Toggle}>
              <CardDetails task={taskCard} listState={listItem?.value} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
