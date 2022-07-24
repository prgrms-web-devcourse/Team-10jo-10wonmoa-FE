import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

export default {
	title: 'Component/AppLayout',
	component: AppLayout,
} as ComponentMeta<typeof AppLayout>;

const Children = styled.div`
	width: 100%;
	height: 500px;
	background-color: white;
`;

export const Default: ComponentStory<typeof AppLayout> = () => {
	return (
		<BrowserRouter>
			<AppLayout>
				<Children>Children</Children>
			</AppLayout>
		</BrowserRouter>
	);
};
