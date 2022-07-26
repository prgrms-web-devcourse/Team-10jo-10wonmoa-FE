import { useReducer, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const isValidDate =
    searchParams.get('date') && searchParams.get('date') !== 'Invalid Date';

  const [date, dispatchMonth] = useReducer(
    timeReducer,
    isValidDate ? initialDate : dayjs()
  );
  const [, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    setSearchParams({ date: date.format('YYYY-MM') });
  }, [date]);

  return {
    date,
    monthDate: date.format('YYYY년 MM월'),
    yearDate: date.format('YYYY년'),
    handlePrevMonth,
    handleNextMonth,
    handleNextYear,
    handlePrevYear,
  };
};

export default useMonthSelector;
