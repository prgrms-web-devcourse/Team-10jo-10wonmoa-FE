import { TopNavOutline, MonthSelector } from '@components';
import type { MonthSelectorProps } from '@components/MonthSelector';

const TopNavAccount: React.FC<MonthSelectorProps> = (props) => {
  return (
    <TopNavOutline>
      <MonthSelector
        date={props.date}
        monthNextHandler={props.monthNextHandler}
        monthPrevHandler={props.monthPrevHandler}
      />
    </TopNavOutline>
  );
};

export default TopNavAccount;
