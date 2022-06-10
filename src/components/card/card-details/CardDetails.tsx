import React, { useEffect, useState } from 'react';
import { useListContext } from '../../../hooks/useListContext';
import { useTaskContext } from '../../../hooks/useTaskContext';
import { List } from '../../../types/List';
import { ActionType, Task } from '../../../types/Task';
import { v4 as uuidv4 } from 'uuid';

import styles from './CardDetails.module.css';

type Props = {
  task?: Task;
  listState?: string;
  id?: string;
  close?: () => void;
};

const CardDetails: React.FC<Props> = ({ task, listState, id }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [taskState, setTaskState] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [formStatue, setFormStatue] = useState<boolean>(false);
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
        payload: {
          id: uuidv4(),
          title: title,
          description: description,
          state: taskState,
        },
      });
      setSuccess('New Task added');
      setTitle('');
      setDescription('');
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
      setSuccess('Task Updated');
    }
    setError('');
    setFormStatue(true);
    setInterval(() => {
      setSuccess('');
      setFormStatue(false);
    }, 2000);
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
        {success && <h6 className={styles.success}>{success}</h6>}
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
        <button
          className={styles.input_submit}
          disabled={formStatue}
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default CardDetails;
