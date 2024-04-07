import React, { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';

const LoadingScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating an asynchronous operation
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader size="xl" />
            ) : (
                <div>
                    {/* Your content when loading is complete */}
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
