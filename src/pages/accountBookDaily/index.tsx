import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { AccountBookDailyCard, AccountBookEmpty } from '@components/account';
import { GoTopButton, Spinner } from '@components';
import useAccountBookDaily from '@hooks/account/useAccountBookDaily';

const AccountBookDaily = () => {
  const [visible, setVisible] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [targetRef, setLoadingRef] = useState<HTMLDivElement>();

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
          entry.isIntersecting ? setVisible(false) : setVisible(true)
        );
      },
      options
    );

    observer.observe(topRef.current);
  }, []);

  const createLoadingObserver = useCallback(() => {
    if (!targetRef) return;
    const options = {
      root: cardRef.current,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(() => {
      fetchNextPage();
    }, options);

    observer.observe(targetRef);
  }, [targetRef]);

  useEffect(() => {
    createLoadingObserver();
    createTopObserver();
  }, [createLoadingObserver, createTopObserver]);

  const loadingRef = useCallback(
    (node: HTMLDivElement) => {
      setLoadingRef(node);
    },
    [cardRef.current]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isEmpty) {
    return <AccountBookEmpty />;
  }

  return (
    <CardArea ref={cardRef}>
      <div ref={topRef} />
      {dailyAccounts?.map((item: DailyAccount, idx) => (
        <AccountBookDailyCard
          key={`daily-account-${item.registerDate}-${idx}`}
          items={item}
        />
      ))}
      <div ref={loadingRef}>{hasNextPage && <Spinner />}</div>
      <GoTopButton topRef={topRef} isVisible={visible} />
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
