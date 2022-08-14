import React from 'react';
import paperPlane from '@assets/PaperPlane.png';
import styled from '@emotion/styled';

const AccountBookEmpty = () => {
  return (
    <StyledEmpty>
      <img src={paperPlane} width="160" />
      <p>아직 등록된 내역이 없어요.</p>
    </StyledEmpty>
  );
};

export default AccountBookEmpty;

const StyledEmpty = styled.div`
  display: block;
  margin: 5rem auto;
  & p {
    font-size: 1.3rem;
  }
`;
