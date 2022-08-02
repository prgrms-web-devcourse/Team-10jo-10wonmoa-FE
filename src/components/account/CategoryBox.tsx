import React from 'react';
import styled from '@emotion/styled';
import { theme } from '@styles';
import { Edit, X as CloseBtn } from 'react-feather';
import { Category } from '@models';

interface CategoryBoxProps {
  CategoryList: Category[];
  categoryRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onSelect: (category: Category) => void;
}

const CategoryBox = ({
  CategoryList,
  categoryRef,
  onClose,
  onSelect,
}: CategoryBoxProps) => {
  return (
    <CategoryContainer ref={categoryRef}>
      <BoxHeader>
        분류
        <BoxHeaderBtnContainer>
          <button>
            <Edit />
          </button>
          <button onClick={onClose}>
            <CloseBtn />
          </button>
        </BoxHeaderBtnContainer>
      </BoxHeader>
      <CategoryItems>
        {CategoryList &&
          CategoryList.map((category) => (
            <CategoryItem key={category.id} onClick={() => onSelect(category)}>
              {category.name}
            </CategoryItem>
          ))}
      </CategoryItems>
    </CategoryContainer>
  );
};

export default CategoryBox;

const CategoryContainer = styled.div`
  position: fixed;
  bottom: 0;
  border: 1px solid ${theme.$gray_dark};
  width: inherit;
  max-width: inherit;
  height: 50%;
  box-sizing: border-box;
  background-color: ${theme.$gray_light};
`;

const BoxHeader = styled.div`
  background-color: ${theme.$black};
  height: 40px;
  color: ${theme.$white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 15px;
`;

const BoxHeaderBtnContainer = styled.div`
  justify-self: flex-end;
  & > button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    color: ${theme.$white};
  }
  button + button {
    margin-left: 10px;
  }
`;

const CategoryItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0;
  place-items: stretch;
  grid-auto-rows: 50px;
`;

const CategoryItem = styled.div`
  display: flex;
  background-color: ${theme.$white};
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.$gray_medium};
  border-right: 1px solid ${theme.$gray_medium};
`;
