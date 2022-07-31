import { TopNavOutline, MonthSelector } from '@components';
import type { MonthSelectorProps } from '@components/MonthSelector';

const TopNavMonthSelector: React.FC<MonthSelectorProps> = (props) => {
  return (
    <TopNavOutline>
      <MonthSelector
        date={props.date}
        onChangePrevMonth={props.onChangePrevMonth}
        onChangeNextMonth={props.onChangeNextMonth}
      />
    </TopNavOutline>
  );
};

export default TopNavMonthSelector;
