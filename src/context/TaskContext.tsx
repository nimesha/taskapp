import React, { createContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Action, ActionType, Task } from '../types/Task';
import moment from 'moment';

type TaskState = typeof initialState;

interface TaskContextInterface {
  taskCard: Task[] | any;
  dispatch: React.Dispatch<Action>;
}

const initialState = JSON.parse(localStorage.getItem('Task') as string) || [];

export const TaskContext = createContext<TaskContextInterface | null>(null);

export const listReducer = (taskCard: TaskState[], action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TASK:
      return [
        ...taskCard,
        {
          id: uuidv4(),
          title: action.payload.title,
          description: action.payload.description,
          state: action.payload.state,
          dateTime: moment().format(),
        },
      ];
    case ActionType.UPDATE_TASK:
      const index: number = taskCard.findIndex(
        (item) => item?.id === action.payload.id
      );
      taskCard[index]!.title = action.payload.title;
      taskCard[index]!.description = action.payload.description;
      taskCard[index]!.state = action.payload.state;
      taskCard[index]!.dateTime = moment().format();

      return [...taskCard];
    case ActionType.REMOVE_TASK:
      return taskCard.filter((item) => item?.id !== action.payload.id);
    default:
      return taskCard;
  }
};

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [taskCard, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    localStorage.setItem('Task', JSON.stringify(taskCard));
  }, [taskCard]);

  return (
    <TaskContext.Provider value={{ taskCard, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
// function a(a: any) {
//   throw new Error('Function not implemented.');
// }
