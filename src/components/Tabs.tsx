import styled from '@emotion/styled';
import { theme } from '@styles';

const Tabs = () => {
  return (
    <TabListContainer>
      <Tab className="active">수입</Tab>
      <Tab>지출</Tab>
    </TabListContainer>
  );
};

export default Tabs;

const TabListContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  background-color: ${theme.$background};
`;

const Tab = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${theme.$background};
  border-bottom: 1px solid ${theme.$gray_dark};
  color: ${theme.$gray_dark};

  &.active {
    background-color: ${theme.$beige};
    border-bottom: 1px solid ${theme.$primary};
    color: ${theme.$primary};
  }
`;
