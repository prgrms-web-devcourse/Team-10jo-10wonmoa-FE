import { useReducer } from 'react';
import dayjs from 'dayjs';

type ActionType = 'NEXT_MONTH' | 'PREV_MONTH' | 'NEXT_YEAR' | 'PREV_YEAR';

interface ActionInterface {
  type: ActionType;
}

const timeReducer = (state: dayjs.Dayjs, action: ActionInterface) => {
  switch (action.type) {
    case 'NEXT_MONTH':
      return state.add(1, 'M');
    case 'PREV_MONTH':
      return state.subtract(1, 'M');
    case 'NEXT_YEAR':
      return state.add(1, 'y');
    case 'PREV_YEAR':
      return state.subtract(1, 'y');
  }
};

const useMonthSelector = (initialDate = dayjs()) => {
  const [date, dispatchMonth] = useReducer(timeReducer, initialDate);

  const handleNextMonth = () => {
    dispatchMonth({ type: 'NEXT_MONTH' });
  };

  const handlePrevMonth = () => {
    dispatchMonth({ type: 'PREV_MONTH' });
  };

  const handleNextYear = () => {
    dispatchMonth({ type: 'NEXT_YEAR' });
  };

  const handlePrevYear = () => {
    dispatchMonth({ type: 'PREV_YEAR' });
  };

  return {
    date: date.format('YYYY년 MM월'), // 여기 바꿈
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handlePrevYear,
  };
};

export default useMonthSelector;
