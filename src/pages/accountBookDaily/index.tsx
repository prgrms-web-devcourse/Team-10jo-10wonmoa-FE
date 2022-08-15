import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { AccountBookDailyCard, AccountBookEmpty } from '@components/account';
import { GoTopButton, Spinner } from '@components';
import useAccountBookDaily from '@hooks/account/useAccountBookDaily';

const AccountBookDaily = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const [loadingRef, setLoadingRef] = useState<HTMLDivElement>();
  const [visibleTopButton, setVisibleTopButton] = useState(false);

  const {
    computedDatas: dailyAccounts,
    isLoading,
    isEmpty,
    hasNextPage,
    fetchNextPage,
  } = useAccountBookDaily();

  const createTopObserver = useCallback(() => {
    if (topRef.current === null) return;

    const options = {
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      (entires: IntersectionObserverEntry[]) => {
        entires.forEach((entry: IntersectionObserverEntry) =>
          entry.isIntersecting
            ? setVisibleTopButton(false)
            : setVisibleTopButton(true)
        );
      },
      options
    );

    observer.observe(topRef.current);
  }, []);

  const createLoadingObserver = useCallback(() => {
    if (!loadingRef) return;

    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(() => {
      fetchNextPage();
    }, options);

    observer.observe(loadingRef);
  }, [loadingRef]);

  useEffect(() => {
    createLoadingObserver();
    createTopObserver();
  }, [createLoadingObserver, createTopObserver]);

  const loadingTargetRef = useCallback((node: HTMLDivElement) => {
    setLoadingRef(node);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isEmpty) {
    return <AccountBookEmpty />;
  }

  return (
    <CardArea>
      <div ref={topRef} />
      {dailyAccounts?.map((item: DailyAccount, idx) => (
        <AccountBookDailyCard
          key={`daily-account-${item.registerDate}-${idx}`}
          items={item}
        />
      ))}
      <div ref={loadingTargetRef}>{hasNextPage && <Spinner />}</div>
      <GoTopButton topRef={topRef} isVisible={visibleTopButton} />
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
  margin-bottom: ${({ theme }) => theme.$bottom_navigation_height};
`;
