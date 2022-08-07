import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { AccountBookDailyCard, PlusButton } from '@components/account';
import { GoTopButton, Spinner, CoinIcon } from '@components';
import useAccountBookDaily from '@hooks/account/useAccountBookDaily';

const AccountBookDaily: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const topRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const {
    data: dailyResult,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useAccountBookDaily();

  const handleNavigateCreateAccount = async () => {
    navigate('/account/create');
  };

  const createTopObserver = useCallback(() => {
    const options = {
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      (entires: IntersectionObserverEntry[]) => {
        entires.forEach((entry: IntersectionObserverEntry) =>
          entry.isIntersecting ? setVisible(false) : setVisible(true)
        );
      },
      options
    );

    if (topRef.current === null) return;
    observer.observe(topRef.current);
  }, []);

  const createBottomObserver = useCallback(() => {
    const options = {
      root: cardRef.current,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(() => {
      fetchNextPage();
    }, options);

    if (loadingRef.current === null) return;
    observer.observe(loadingRef.current);
  }, []);

  useEffect(() => {
    createBottomObserver();
    createTopObserver();
  }, []);

  if (!isLoading && dailyResult?.pages.length === 0) {
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
      {dailyResult?.pages.map((page: DailyAccountBook) => {
        return page.results.map((item: DailyAccount, idx: number) => (
          <AccountBookDailyCard key={idx} items={item} />
        ));
      })}
      <div ref={loadingRef}>{hasNextPage && <Spinner />}</div>
      <GoTopButton topRef={topRef} isVisible={visible} />
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
`;
