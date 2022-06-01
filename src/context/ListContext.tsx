import React, { createContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Action, ActionType, List } from '../types/List';

type ListState = typeof initialState;

interface ListContextInterface {
  list: List[];
  dispatch: React.Dispatch<Action>;
}

const initialState = JSON.parse(localStorage.getItem('List') as string) || [];

export const ListContext = createContext<ListContextInterface | null>(null);

export const listReducer = (list: ListState[], action: Action) => {
  switch (action.type) {
    case ActionType.ADD_LIST:
      return [
        ...list,
        {
          id: uuidv4(),
          title: action.payload.title,
          value: action.payload.value,
        },
      ];
    case ActionType.REMOVE_LIST:
      return list.filter((item) => item?.id !== action.payload.id);
    default:
      return list;
  }
};

export const ListContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [list, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(list));
  }, [list]);

  return (
    <ListContext.Provider value={{ list, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
