import React, { useEffect, useState } from 'react';
import { useListContext } from '../../../hooks/useListContext';
import { useTaskContext } from '../../../hooks/useTaskContext';
import { List } from '../../../types/List';
import { ActionType, Task } from '../../../types/Task';

import styles from './CardDetails.module.css';

type Props = {
  task: Task;
  listState?: string;
  id?: string;
  close?: () => void;
};

const CardDetails: React.FC<Props> = ({ task, listState, id, close }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [taskState, setTaskState] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { dispatch } = useTaskContext();
  const { list } = useListContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setError('Task Name is required');
      return true;
    }

    if (id === undefined) {
      dispatch({
        type: ActionType.ADD_TASK,
        payload: { title: title, description: description, state: taskState },
      });
    } else {
      dispatch({
        type: ActionType.UPDATE_TASK,
        payload: {
          id: id,
          title: title,
          description: description,
          state: taskState,
        },
      });
    }

    if (close !== undefined) {
      close();
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title ? task.title : '');
      setDescription(task.description ? task.description : '');
    }
    if (id === undefined) {
      setTaskState(listState ? listState : '');
    } else {
      task?.state && setTaskState(task.state);
    }
  }, []);

  return (
    <>
      <form className={styles.task} onSubmit={handleSubmit}>
        <label className={styles.element}>
          <span> Task Name:</span>
          <input
            type="input"
            placeholder="Enter a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <label className={styles.element}>
          <span>Task Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.element}>
          <span> State </span>
          <select
            value={taskState}
            onChange={(e) => setTaskState(e.target.value)}
          >
            {list &&
              list.map((item: List, index: number) => (
                <option key={index} value={item?.value}>
                  {item?.title}
                </option>
              ))}
          </select>
        </label>
        <button className={styles.input_submit} type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default CardDetails;
