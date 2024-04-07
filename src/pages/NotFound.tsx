import { Box, Container } from '@mantine/core';

const NotFound: React.FC = () => (
    <Container h="80vh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </Box>
    </Container>
);

export default NotFound;
