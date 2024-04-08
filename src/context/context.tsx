import React, { createContext, useState } from 'react';

export const TaskContext = createContext<any>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [newTask, setNewTask] = useState<string | null>(null);

    const addNewTask = (task: string) => {
        setNewTask(task);
    };

    return (
        <TaskContext.Provider value={{ newTask, addNewTask }}>
            {children}
        </TaskContext.Provider>
    );
};
