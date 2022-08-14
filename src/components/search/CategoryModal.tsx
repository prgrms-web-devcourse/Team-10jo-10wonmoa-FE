import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { BackupLayer, Tabs, Toggle } from '@components';
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
import { default as toast } from 'react-hot-toast';
import { CheckBoxList, RadioList } from '@components/search';

interface ModalProps {
  visible: boolean;
  type: 'radio' | 'checkbox';
  onClose: () => void;
  onSubmit: (categories: Category[]) => void;
  parentAccountType?: TabItem;
}

const CATEGORY_MIN_LIMIT = 0;
const CATEGORY_MAX_LIMIT = 20;

const CategoryModal = ({
  visible,
  type,
  onClose,
  onSubmit,
  parentAccountType,
}: ModalProps) => {
  const modalRef = useClickAway(onClose);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const currentCategoryType = parentAccountType
    ? parentAccountType.value
    : accountType.value;
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([]);
  const [editModeToggle, setEditModeToggle] = useState(false);
  const isCheckBoxForm = type === 'checkbox';
  const InputTypeListTag = isCheckBoxForm ? CheckBoxList : RadioList;
  const queryClient = useQueryClient();

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
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
      toast.error('카테고리 이름은 1~20자까지 가능합니다');
      return;
    }

    addCategoryMutation.mutate({
      categoryType: currentCategoryType,
      name: inputRef.value,
    });

    inputRef.value = '';
  };

  const handleUpdateCategory = (category: Category, name: string) => {
    if (name === category.name) {
      toast.error('동일한 이름으로 수정할 수 없습니다');
      return;
    }

    if (
      name.length <= CATEGORY_MIN_LIMIT ||
      name.length >= CATEGORY_MAX_LIMIT
    ) {
      toast.error('카테고리 이름은 1~20자까지 가능합니다');
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
    ['categories', currentCategoryType],
    () => fetchGetCategory(currentCategoryType),
    {
      enabled: !!accountType,
    }
  );

  const addCategoryMutation = useMutation(
    ['addCategory'],
    (categoryInfo: CreateCategoryRequest) => fetchPostCategory(categoryInfo),
    {
      onSuccess: () => {
        toast.success('추가 성공');
        queryClient.invalidateQueries(['categories', currentCategoryType]);
      },
    }
  );

  const updateCategoryMutation = useMutation(
    ['updateCategory'],
    ({ categoryId, name }: UpdateCategoryRequest) =>
      fetchUpdateCategory({ categoryId, name }),
    {
      onSuccess: () => {
        toast.success('수정 성공');
        queryClient.invalidateQueries(['categories', currentCategoryType]);
      },
    }
  );

  const deleteCategoryMutation = useMutation(
    ['deleteCategory'],
    (categoryId: number) => fetchDeleteCategory(categoryId),
    {
      onSuccess: () => {
        toast.success('삭제 성공');
        queryClient.invalidateQueries(['categories', currentCategoryType]);
      },
    }
  );

  return (
    <BackupLayer visible={visible}>
      <ModalContainer ref={modalRef}>
        <ContentContainer>
          <ModalTitle>
            <span>분류</span>
            <Toggle
              name="category-editmode-toggle"
              on={editModeToggle}
              key="editmode-toggle"
              onChange={() => setEditModeToggle((prevState) => !prevState)}
            />
          </ModalTitle>
          {isCheckBoxForm && (
            <Tabs
              tabItems={ACCOUNT_TYPE}
              onClick={handleTabClick}
              initialItem={accountType}
            />
          )}
          <InputTypeListTag
            categories={categories?.categories}
            selectedCategory={selectedCategory}
            isEditMode={editModeToggle}
            onChange={setSelectedCategory}
            onEdit={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          >
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
          </InputTypeListTag>
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
  & > span {
    font-size: 1.2rem;
    font-weight: bold;
  }
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
