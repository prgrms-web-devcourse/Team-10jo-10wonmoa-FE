import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Edit2 as EditIcon, Trash2 as DeleteIcon } from 'react-feather';
import { CheckBox } from '@components';
import { Category } from '@types';

interface CheckBoxListProps {
  categories: Category[];
  selectedCategory: Category[];
  isEditMode: boolean;
  onChange: (category: Category[]) => void;
  onEdit: (category: Category, name: string) => void;
  onDelete: (categoryId: number) => void;
  children: React.ReactNode;
}

const CheckBoxList = ({
  categories = [],
  selectedCategory,
  isEditMode,
  onChange,
  onEdit,
  onDelete,
  children,
}: CheckBoxListProps) => {
  const [editInputId, setEditInputId] = useState<number>(-1);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleAllCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentAccountType =
      categories.length > 0 ? categories[0].categoryType : '';

    const filteredState = selectedCategory.filter(
      (category) => category.categoryType !== currentAccountType
    );

    const nextSelectedCategory = e.target.checked
      ? filteredState.concat(categories)
      : filteredState;

    onChange(nextSelectedCategory);
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    const nextSelectedCategory = e.target.checked
      ? selectedCategory.concat(category)
      : selectedCategory.filter(
          (prevCategory) => prevCategory.id !== category.id
        );

    onChange(nextSelectedCategory);
  };

  const handleEditSubmit = (category: Category) => {
    const inputRef = editInputRef.current;
    if (!inputRef) {
      return;
    }

    onEdit(category, inputRef.value);
    resetEditInputId();
  };

  const resetEditInputId = () => {
    setEditInputId(-1);
  };

  const isAllCategorySelected = categories.every((category: Category) =>
    selectedCategory.includes(category)
  );

  return (
    <CheckBoxListContainer>
      <CheckBoxContainer key="category_all_select">
        <CheckBox
          text="전체 선택"
          isChecked={isAllCategorySelected}
          onChange={handleAllCategoryChange}
        />
      </CheckBoxContainer>
      {categories.map((category: Category) => (
        <CheckBoxContainer key={category.id}>
          {category.id !== editInputId ? (
            <>
              <CheckBox
                text={category.name}
                isChecked={selectedCategory.includes(category)}
                onChange={(e) => handleCategoryChange(e, category)}
              />
              {isEditMode && (
                <ButtonContainer>
                  <button onClick={() => setEditInputId(category.id)}>
                    <EditIcon size={18} />
                  </button>
                  <button onClick={() => onDelete(category.id)}>
                    <DeleteIcon size={18} />
                  </button>
                </ButtonContainer>
              )}
            </>
          ) : (
            <EditContainer>
              <input
                type="text"
                defaultValue={category.name}
                ref={editInputRef}
              />
              <button onClick={() => handleEditSubmit(category)}>완료</button>
              <button onClick={resetEditInputId}>취소</button>
            </EditContainer>
          )}
        </CheckBoxContainer>
      ))}
      {isEditMode && children}
    </CheckBoxListContainer>
  );
};

export default CheckBoxList;

const CheckBoxListContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  & + & {
    border-top: 1px solid ${(props) => props.theme.$gray_accent};
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  & > input {
    border: 1px solid ${(props) => props.theme.$gray_medium};
    margin: 0;
    padding: 0 0.5rem;
    height: 2rem;
    font-size: 1rem;
    outline: none;
    flex-grow: 1;
    border-radius: 0.5rem;
  }

  & > button {
    background-color: ${(props) => props.theme.$primary};
    border: 0;
    color: ${(props) => props.theme.$white};
    cursor: pointer;
    width: 2rem;
    height: 1.8rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 0.8rem;
    justify-self: flex-end;
    margin-left: 0.3rem;
  }
`;

const ButtonContainer = styled.div`
  display: block;
  justify-self: flex-end;
  & > button {
    background-color: transparent;
    color: ${(props) => props.theme.$gray_dark};
    border: 0;
  }
  & > button:hover {
    color: ${(props) => props.theme.$red};
  }
`;
