import { Global, ThemeProvider } from '@emotion/react';
import AppLayout from './styles/AppLayout/AppLayout';
import theme from './styles/theme';
import reset from './styles/reset';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={reset} />
			<AppLayout>
				<div>10원모아10조</div>
			</AppLayout>
		</ThemeProvider>
	);
}

export default App;
