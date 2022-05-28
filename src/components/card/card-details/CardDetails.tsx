import React, { useEffect, useState } from 'react';
import { Task } from '../../types/Task';
import styles from './CardDetails.module.css';

type Props = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
};

const CardDetails: React.FC<Props> = ({ task, setTask }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [taskState, setTaskState] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTask({ title: title, description: description, state: taskState });
    console.log(taskState);
  };

  useEffect(() => {
    console.log(task);
  }, [task]);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setTaskState(task.state);
  }, []);

  return (
    <>
      <form
        className={styles.task}
        onSubmit={handleSubmit}
        // onSubmit={(e) => {
        //   handleTask(e);
        //   inputRef.current?.select();
        // }}
      >
        <label className={styles.element}>
          <span> Task Name:</span>
          <input
            type="input"
            placeholder="Enter a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.element}>
          <span>Task Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.element}>
          <span>Kanban state </span>
          <select
            value={taskState}
            onChange={(e) => setTaskState(e.target.value)}
          >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
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
