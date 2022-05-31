export type List = {
  id?: string;
  title: string;
  value: string;
};

export enum ActionType {
  ADD_LIST = 'ADD_LIST',
}

export type Action = {
  payload: List;
  type: ActionType.ADD_LIST;
};
