import React from 'react';
import paperPlane from '@assets/PaperPlane.png';
import styled from '@emotion/styled';

const SearchResultEmpty = () => {
  return (
    <StyledEmpty>
      <img src={paperPlane} width="120" />
      <span>검색 결과가 존재하지 않습니다</span>
    </StyledEmpty>
  );
};

export default SearchResultEmpty;

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  & > span {
    display: block;
    font-size: 1.2rem;
  }
`;
