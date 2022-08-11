import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Edit2 as EditIcon, Trash2 as DeleteIcon } from 'react-feather';

interface CheckBoxInterface {
  text?: string;
  isChecked?: boolean;
  isEditMode?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit?: (name: string) => void;
  onDelete?: () => void;
}

const CheckBox: React.FC<CheckBoxInterface> = ({
  text,
  isChecked,
  isEditMode,
  onChange,
  onEdit,
  onDelete,
}) => {
  const [editState, setEditState] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const isShowEditIcon = isEditMode && !editState;
  const isCategoryEditMode = isEditMode && editState;

  useEffect(() => {
    if (!isEditMode) {
      setEditState(false);
    }
  }, [isEditMode]);

  const handleEditSubmit = () => {
    const inputRef = editInputRef.current;
    if (!inputRef) {
      return;
    }

    onEdit && onEdit(inputRef.value);
    setEditState(false);
  };

  const handleEventPrevent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <StyledInput type="checkbox" checked={isChecked} onChange={onChange} />
      {isCategoryEditMode ? (
        <EditContainer onClick={handleEventPrevent}>
          <input type="text" defaultValue={text} ref={editInputRef} />
          <button onClick={handleEditSubmit}>완료</button>
          <button onClick={() => setEditState(false)}>취소</button>
        </EditContainer>
      ) : (
        <span>{text}</span>
      )}
      {isShowEditIcon && (
        <ButtonContainer onClick={handleEventPrevent}>
          <button onClick={() => setEditState(true)}>
            <EditIcon size={18} />
          </button>
          <button onClick={onDelete}>
            <DeleteIcon size={18} />
          </button>
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.$gray_dark};
  & + & {
    border-top: 1px solid ${(props) => props.theme.$gray_accent};
  }

  & > span {
    flex-grow: 1;
  }
`;

const StyledInput = styled.input`
  appearance: none;
  color: ${(props) => props.theme.$primary};
  border: 1.5px solid ${(props) => props.theme.$gray_medium};
  border-radius: 0.35rem;
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.5rem;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    color: ${(props) => props.theme.$primary};
    background-color: ${(props) => props.theme.$primary};
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

export default CheckBox;
