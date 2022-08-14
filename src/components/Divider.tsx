import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@styles';

interface DividerInterface {
  size?: number;
  dividerType?: 'horizontal' | 'vertical';
  thick?: number;
}

const Divider: React.FC<DividerInterface> = ({
  dividerType = 'horizontal',
  size = 8,
  thick = 1,
}) => {
  return <Line dividerType={dividerType} size={size} thick={thick} />;
};

const Line = styled.hr<DividerInterface>`
  border: none;
  width: ${(props) => props.size + 'rem'};
  height: ${(props) => props.thick + 'px'};
  background-color: ${theme.$gray_medium};
  ${(props) => props.dividerType && dividerType[props.dividerType]}
`;

const dividerType = {
  horizontal: css`
    margin: 0.5rem 0;
    display: block;
  `,
  vertical: css`
    position: relative;
    top: -1px;
    display: inline-block;
    height: 13px;
    vertical-align: middle;
  `,
};
export default Divider;
