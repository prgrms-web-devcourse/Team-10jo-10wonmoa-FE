import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CoinIcon } from '@components';

const NotFound = () => {
  return (
    <>
      <ErrorSection>
        <h2> Not Found </h2>
        <Link to="/account-book/daily">
          <CoinIcon />
        </Link>
      </ErrorSection>
    </>
  );
};

export default NotFound;

export const ErrorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  h2 {
    font-size: 3rem;
    color: ${(props) => props.theme.$primary};
    margin-bottom: 1.2rem;
  }
`;
