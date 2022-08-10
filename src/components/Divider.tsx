import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@styles';

interface DividerInterface {
  size?: number;
  dividerType?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerInterface> = ({
  dividerType = 'horizontal',
  size = 8,
}) => {
  return <Line dividerType={dividerType} size={size} />;
};

const Line = styled.hr<DividerInterface>`
  border: none;
  width: ${(props) => props.size + 'rem'};
  background-color: ${theme.$gray_medium};
  ${(props) => props.dividerType && dividerType[props.dividerType]}
`;

const dividerType = {
  horizontal: css`
    margin: 0.5rem 0;
    display: block;
    height: 1px;
  `,
  vertical: css`
    position: relative;
    top: -1px;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  `,
};
export default Divider;
