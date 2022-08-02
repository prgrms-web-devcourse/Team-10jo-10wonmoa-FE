import { useReducer } from 'react';
import dayjs from 'dayjs';

type ActionType = 'NEXT' | 'PREV';
interface ActionInterface {
  type: ActionType;
}

const timeReducer = (state: dayjs.Dayjs, action: ActionInterface) => {
  switch (action.type) {
    case 'NEXT':
      return state.add(1, 'M');
    case 'PREV':
      return state.subtract(1, 'M');
  }
};

const useMonthSelector = (initialDate = dayjs()) => {
  const [date, dispatchMonth] = useReducer(timeReducer, initialDate);

  const handleNextMonth = () => {
    dispatchMonth({ type: 'NEXT' });
  };

  const handlePrevMonth = () => {
    dispatchMonth({ type: 'PREV' });
  };

  return {
    date: date.format('YYYY.MM'),
    handlePrevMonth,
    handleNextMonth,
  };
};

export default useMonthSelector;
