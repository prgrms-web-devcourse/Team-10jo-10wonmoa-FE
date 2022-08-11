import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { BackupLayer, Tabs, CheckBox, Toggle } from '@components';
import { useClickAway } from '@hooks';
import { ACCOUNT_TYPE } from '@constants/Tabs';
import { TabItem, Category } from '@types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  fetchGetCategory,
  fetchPostCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
} from '@api';
import type { CreateCategoryRequest, UpdateCategoryRequest } from '@types';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (categories: Category[]) => void;
}

const CATEGORY_MIN_LIMIT = 0;
const CATEGORY_MAX_LIMIT = 20;

const CategoryModal = ({ visible, onClose, onSubmit }: ModalProps) => {
  const modalRef = useClickAway(onClose);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editModeToggle, setEditModeToggle] = useState(false);
  const queryClient = useQueryClient();

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

  const handleAddCategory = () => {
    const inputRef = categoryInputRef.current;
    if (!inputRef) {
      return;
    }

    if (
      inputRef.value.length <= CATEGORY_MIN_LIMIT ||
      inputRef.value.length >= CATEGORY_MAX_LIMIT
    ) {
      alert('카테고리 이름은 1~20자까지 가능합니다');
      return;
    }

    addCategoryMutation.mutate({
      categoryType: accountType.value,
      name: inputRef.value,
    });

    inputRef.value = '';
  };

  const handleUpdateCategory = (category: Category, name: string) => {
    if (name === category.name) {
      alert('동일한 이름으로 수정할 수 없습니다');
      return;
    }

    if (
      name.length <= CATEGORY_MIN_LIMIT ||
      name.length >= CATEGORY_MAX_LIMIT
    ) {
      alert('카테고리 이름은 1~20자까지 가능합니다');
      return;
    }

    updateCategoryMutation.mutate({ categoryId: category.id, name });
  };

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId);
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

  const addCategoryMutation = useMutation(
    ['addCategory'],
    (categoryInfo: CreateCategoryRequest) => fetchPostCategory(categoryInfo),
    {
      onSuccess: () => {
        alert('추가 성공');
        queryClient.invalidateQueries(['categories', accountType.value]);
      },
    }
  );

  const updateCategoryMutation = useMutation(
    ['updateCategory'],
    ({ categoryId, name }: UpdateCategoryRequest) =>
      fetchUpdateCategory({ categoryId, name }),
    {
      onSuccess: () => {
        alert('수정 성공');
        queryClient.invalidateQueries(['categories', accountType.value]);
      },
    }
  );

  const deleteCategoryMutation = useMutation(
    ['deleteCategory'],
    (categoryId: number) => fetchDeleteCategory(categoryId),
    {
      onSuccess: () => {
        alert('삭제 성공');
        queryClient.invalidateQueries(['categories', accountType.value]);
      },
    }
  );

  return (
    <BackupLayer visible={visible}>
      <ModalContainer ref={modalRef}>
        <ContentContainer>
          <ModalTitle>
            <p>분류</p>
            <Toggle
              name="category-editmode-toggle"
              on={editModeToggle}
              key="editmode-toggle"
              onChange={() => setEditModeToggle((prevState) => !prevState)}
            />
          </ModalTitle>
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
              isEditMode={false}
            />
            {categories?.categories.map((category: Category) => (
              <CheckBox
                key={category.id}
                text={category.name}
                isChecked={selectedCategory.includes(category)}
                onChange={(e) => handleCategoryChange(e, category)}
                onEdit={(name) => handleUpdateCategory(category, name)}
                onDelete={() => handleDeleteCategory(category.id)}
                isEditMode={editModeToggle}
              />
            ))}
            {editModeToggle && (
              <CategoryAddContainer>
                <label htmlFor="category-add-input" />
                <input
                  id="category-add-input"
                  type="text"
                  placeholder="카테고리 추가"
                  ref={categoryInputRef}
                />
                <button onClick={handleAddCategory}>추가</button>
              </CategoryAddContainer>
            )}
          </CheckBoxContainer>
        </ContentContainer>
        <ButtonContainer>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit}>확인</button>
        </ButtonContainer>
      </ModalContainer>
    </BackupLayer>
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
  padding: 0.7rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    font-size: 1.2rem;
    font-weight: bold;
  }
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

const CategoryAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border-top: 1px solid ${(props) => props.theme.$gray_accent};
  border-bottom: 1px solid ${(props) => props.theme.$gray_accent};
  height: 4rem;
  font-size: 1rem;

  & > input {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.$gray_medium};
    margin: 0;
    padding: 0.8rem 0.5rem;
    height: 2.2rem;
    font-size: 1rem;
    outline: none;
    width: 16rem;
  }

  & > button {
    background-color: ${(props) => props.theme.$primary};
    border: 0;
    color: ${(props) => props.theme.$white};
    cursor: pointer;
    width: 3rem;
    height: 2.2rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 1rem;
  }
`;
