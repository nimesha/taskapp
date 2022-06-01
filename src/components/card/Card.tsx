import styles from './Card.module.css';
import { FaEdit } from 'react-icons/fa';
import Modal from '../modal/Modal';
import { useState } from 'react';
import CardDetails from './card-details/CardDetails';
import { ActionType, Task } from '../../types/Task';
import { useTaskContext } from '../../hooks/useTaskContext';
import moment from 'moment';

type Props = {
  task: Task;
};

const Card: React.FC<Props> = ({ task }) => {
  const [modal, setModal] = useState(false);
  const { dispatch } = useTaskContext();

  const Toggle = () => setModal(!modal);
  const handleDelete = () => {
    const confirmBox = window.confirm('Are you sure you want to delete this?');
    if (confirmBox === true) {
      dispatch({
        type: ActionType.REMOVE_TASK,
        payload: { id: task?.id },
      });
    }
  };
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h5>{task?.title}</h5>
        <button className={styles.close} onClick={() => Toggle()}>
          <FaEdit />
        </button>
      </header>
      <article className={styles.content}>
        <p>{task?.description}</p>
      </article>
      <footer className={styles.footer}>
        <small>
          Last updated on: {moment(task?.dateTime).format('DD/MM/YYYY hh:mm')}
        </small>
        <span>
          <button onClick={handleDelete} className={styles.delete}>
            Delete
          </button>
        </span>
      </footer>
      <Modal show={modal} close={Toggle}>
        <CardDetails task={task} id={task?.id} close={() => Toggle()} />
      </Modal>
    </div>
  );
};

export default Card;
