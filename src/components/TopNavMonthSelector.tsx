import { TopNavOutline, DateSelector } from '@components';
import type { DateSelectorProps } from '@components/DateSelector';

const TopNavMonthSelector: React.FC<DateSelectorProps> = (props) => {
  return (
    <TopNavOutline>
      <DateSelector
        date={props.date}
        onChangePev={props.onChangePev}
        onChangeNext={props.onChangeNext}
      />
    </TopNavOutline>
  );
};

export default TopNavMonthSelector;
