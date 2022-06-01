export type List = {
  id?: string;
  title: string;
  value: string;
};

export enum ActionType {
  ADD_LIST = 'ADD_LIST',
  REMOVE_LIST = 'REMOVE_LIST',
}

export type Action =
  | {
      payload: List;
      type: ActionType.ADD_LIST;
    }
  | {
      payload: { id: string };
      type: ActionType.REMOVE_LIST;
    };
