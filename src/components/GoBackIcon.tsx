import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';

const GoBackIcon: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledGoBackIcon onClick={handleGoBack}>
      <ChevronLeft />
    </StyledGoBackIcon>
  );
};

const StyledGoBackIcon = styled.a`
  font-size: 2.5rem;
  margin: 0 1rem;
  position: relative;
  left: 0;
  cursor: pointer;
`;

export default GoBackIcon;
