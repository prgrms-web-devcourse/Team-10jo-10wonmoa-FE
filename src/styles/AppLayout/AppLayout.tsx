import React from 'react';
import styled from '@emotion/styled';
import theme from '../theme';

interface AppLayoutInterface {
	children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutInterface> = ({ children }) => {
	return (
		<Wrapper>
			<Layout>{children}</Layout>
		</Wrapper>
	);
};

export default AppLayout;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${theme.$background};
`;

const Layout = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	box-sizing: border-box;
	align-items: center;
	max-width: 375px;
	min-height: 100vh;
	box-shadow: 0 0 2rem 0.1rem rgba(0, 0, 0, 0.3);
	background-color: ${theme.$white};
	margin: auto;
	@media screen and (max-width: 700px) {
		max-width: 100vw;
	}
`;
