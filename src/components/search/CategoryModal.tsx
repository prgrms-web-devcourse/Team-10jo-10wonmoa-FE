import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BackupLayer, Tabs, CheckBox } from '@components';
import { useClickAway } from '@hooks';
import { ACCOUNT_TYPE } from '@constants/Tabs';
import { TabItem, Category } from '@types';
import { useQuery } from 'react-query';
import { fetchGetCategory } from '@api';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (categories: Category[]) => void;
}

const CategoryModal = ({ visible, onClose, onSubmit }: ModalProps) => {
  const modalRef = useClickAway(onClose);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    setSelectedCategory((prevState) =>
      e.target.checked
        ? [...prevState, category]
        : prevState.filter((prevCategory) => prevCategory.id !== category.id)
    );
  };

  const handleAllCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredState = selectedCategory.filter(
      (category) => category.categoryType !== accountType.value
    );

    const currentAllCategory = categories?.categories ?? [];

    setSelectedCategory(
      e.target.checked
        ? [...filteredState, ...currentAllCategory]
        : [...filteredState]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedCategory);
    onClose();
  };

  const { data: categories } = useQuery(
    ['categories', accountType.value],
    () => fetchGetCategory(accountType.value),
    {
      enabled: !!accountType,
    }
  );

  return (
    <>
      {visible && (
        <BackupLayer visible={visible}>
          <ModalContainer ref={modalRef}>
            <ContentContainer>
              <ModalTitle>분류</ModalTitle>
              <Tabs
                tabItems={ACCOUNT_TYPE}
                onClick={handleTabClick}
                initialItem={accountType}
              />
              <CheckBoxContainer>
                <CheckBox
                  key="category_all_select"
                  text="전체 선택"
                  isChecked={
                    categories?.categories.every((category: Category) =>
                      selectedCategory.includes(category)
                    ) ?? false
                  }
                  onChange={handleAllCategoryChange}
                />
                {categories?.categories.map((category: Category) => (
                  <CheckBox
                    key={category.id}
                    text={category.name}
                    isChecked={selectedCategory.includes(category)}
                    onChange={(e) => handleCategoryChange(e, category)}
                  />
                ))}
              </CheckBoxContainer>
            </ContentContainer>
            <ButtonContainer>
              <button onClick={onClose}>취소</button>
              <button onClick={handleSubmit}>확인</button>
            </ButtonContainer>
          </ModalContainer>
        </BackupLayer>
      )}
    </>
  );
};

export default CategoryModal;

const ModalContainer = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  color: ${(props) => props.theme.$black};
  background-color: ${(props) => props.theme.$white};
  border-radius: 0.5rem;
  height: 75vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.7rem 1.2rem;
`;

const CheckBoxContainer = styled.div`
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.$white};
  border-radius: 1rem;
  margin-top: 1rem;
  height: 3rem;
  & > button {
    flex-grow: 1;
    padding: 1rem;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
  button + button {
    border-left: 1px solid ${(props) => props.theme.$gray_medium};
  }
`;
