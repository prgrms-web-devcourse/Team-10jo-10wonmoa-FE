import { useReducer } from 'react';

type ActionType = 'NEXT' | 'PREV';
interface ActionInterface {
  type: ActionType;
  payload: number;
}

const timeReducer = (state: Date, action: ActionInterface) => {
  switch (action.type) {
    case 'NEXT':
      return new Date(state.setMonth(action.payload + 1));
    case 'PREV':
      return new Date(state.setMonth(action.payload - 1));
  }
};

const UseMonthSelector = (initialDate: Date) => {
  const [date, dispatchMonth] = useReducer(timeReducer, initialDate);

  const monthNextHandler = () => {
    dispatchMonth({ type: 'NEXT', payload: date.getMonth() });
  };

  const monthPrevHandler = () => {
    dispatchMonth({ type: 'PREV', payload: date.getMonth() });
  };

  return {
    date,
    monthNextHandler,
    monthPrevHandler,
  };
};

export default UseMonthSelector;