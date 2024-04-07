import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import Router from './routes';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MantineProvider>
  );
}
