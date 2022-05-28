import styles from './Card.module.css';
import { FaEdit, FaCircle } from 'react-icons/fa';
// import useModal from '../../hooks/useModal';
import Modal from '../modal/Modal';
import { useEffect, useState } from 'react';
import CardDetails from './card-details/CardDetails';
import { Task } from '../types/Task';

const Card = () => {
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState<Task>({
    title: 'name',
    description: 'des',
    state: 'up',
  });

  useEffect(() => {
    setTask({ title: 'name', description: 'des', state: 'up' });
  }, []);

  const Toggle = () => setModal(!modal);
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h5>CSS Animation</h5>
        <FaEdit />
      </header>
      <article className={styles.content}>
        <p>this is description of abc</p>
      </article>
      <footer className={styles.footer}>
        <small>Last updated on 27/05/2022</small>
        <span>
          <FaCircle />
        </span>
      </footer>
      <button className="clickMe" onClick={() => Toggle()}>
        Modal
      </button>
      <Modal show={modal} close={Toggle}>
        <CardDetails task={task} setTask={setTask} />
      </Modal>
    </div>
  );
};

export default Card;
