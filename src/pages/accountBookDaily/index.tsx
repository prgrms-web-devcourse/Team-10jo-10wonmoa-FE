import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AccountBookDailyCard, PlusButton } from '@components/account';
import { GoTopButton, Spinner, CoinIcon } from '@components';
import useAccountBookDaily from '@hooks/account/useAccountBookDaily';
import { dateFormatter } from '@utils/formatter';
const AccountBookDaily: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  const date = dateFormatter(
    searchParams.get('date') || new Date(),
    'YEAR_DAY_DASH'
  );

  const { data: dailyResult, isLoading } = useAccountBookDaily(date);
  const { results } = dailyResult;

  const handleNavigateCreateAccount = async () => {
    navigate('/account/create');
  };

  if (!isLoading && dailyResult.results.length === 0) {
    return (
      <>
        <p>👇 클릭해서 가계부를 등록해보세요!</p>
        <a onClick={handleNavigateCreateAccount}>
          <CoinIcon />
        </a>
      </>
    );
  }

  return (
    <CardArea>
      <div ref={topRef} />
      {results?.map((item: DailyAccount, idx: number) => (
        <AccountBookDailyCard key={idx} items={item} />
      ))}
      {isLoading && <Spinner />}
      <GoTopButton topRef={topRef} />
      <PlusButton onClickPlus={handleNavigateCreateAccount} />
    </CardArea>
  );
};

export default AccountBookDaily;

const CardArea = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 0%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  row-gap: 1rem;
  margin-bottom: 7rem;
  &:hover::-webkit-scrollbar {
    height: 0.7rem;
  }

  &:hover::-webkit-scrollbar-track {
    background-color: white;
  }

  &:hover::-webkit-scrollbar-thumb {
    border-width: 0.3rem;
    border-radius: 1.2rem;
    background-color: lightgray;
  }
`;
