import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { dateFormatter, currencyFormatter } from '@utils/formatter';
const AccountBookDailyItem: React.FC<{ item: SingleAccount }> = (props) => {
  const navigate = useNavigate();

  const itemType = props.item.type;
  const accountUpdatePath = `/account/update/${itemType.toLowerCase()}/${
    props.item.id
  }`;

  return (
    <Wrapper onClick={() => navigate(accountUpdatePath)}>
      <div>
        <p>{dateFormatter(props.item.registerTime, 'HOUR_MINUTE')}</p>
      </div>
      <div>
        <p>{props.item.categoryName}</p>
        <p>{props.item.content}</p>
      </div>
      <div>
        <StyledParagraph type={props.item.type}>
          {currencyFormatter(props.item.amount)}원
        </StyledParagraph>
      </div>
    </Wrapper>
  );
};

export default AccountBookDailyItem;

const Wrapper = styled.div<{ type?: string }>`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 2rem 2rem;
  border-bottom: 3px solid ${(props) => props.theme.$gray_light};

  & div:nth-of-type(1) {
    & p:nth-of-type(1) {
      font-size: 0.8rem;
      color: ${(props) => props.theme.$gray_medium};
    }
  }

  & div:nth-of-type(2) {
    text-align: left;
    & p:nth-of-type(2) {
      font-size: 0.7rem;
      color: ${(props) => props.theme.$gray_medium};
    }
  }
  & div:nth-of-type(3) {
    text-align: right;
  }
`;

const StyledParagraph = styled.p<{ type?: string }>`
  color: ${(props) =>
    props.type === 'INCOME'
      ? props.theme.$blue
      : props.type === 'EXPENDITURE'
      ? props.theme.$red
      : props.theme.$black};
`;
