import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './theme';
import Router from './routes';
import client from './apollo';

export default function App() {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <ApolloProvider client={client}>
        <ModalsProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ModalsProvider>
      </ApolloProvider>
    </MantineProvider>
  );
}
