export type Task = {
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  dateTime?: Date;
};

export enum ActionType {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
}

export type Action =
  | {
      payload: Task;
      type: ActionType.ADD_TASK;
    }
  | {
      payload: Task;
      type: ActionType.UPDATE_TASK;
    }
  | {
      payload: Task;
      type: ActionType.REMOVE_TASK;
    };
