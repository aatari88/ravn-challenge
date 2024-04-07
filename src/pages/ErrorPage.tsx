import { Box, Container } from '@mantine/core';

const ErrorPage: React.FC = () => (
    <Container h="80vh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
            <h1>Error</h1>
            <p>Oops! Something went wrong.</p>
        </Box>
    </Container>
);

export default ErrorPage;
