import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { FaWindowClose } from 'react-icons/fa';

const modalRoot = document.getElementById('portal') as HTMLElement;

type Props = {
  show: boolean;
  close: any;
  children: JSX.Element;
};

const Modal: React.FC<Props> = ({ show, close, children }) =>
  show
    ? ReactDOM.createPortal(
        <>
          <div className={styles.modal_content}>
            <header className={styles.modal_header}>
              <button className={styles.close} onClick={() => close()}>
                <FaWindowClose />
              </button>
            </header>
            <main> {children} </main>
          </div>
          <div className={styles.modal_overlay}></div>
        </>,
        modalRoot
      )
    : null;
export default Modal;
