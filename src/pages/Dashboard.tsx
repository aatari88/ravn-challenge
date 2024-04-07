import { Box, Group, ScrollArea, Skeleton, Stack, Text } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskInventoryData, TaskInventoryVars } from '@/interfaces/TaskInventory';

const GET_TASK_INVENTORY = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      status
      dueDate
      tags
      pointEstimate
      assignee {
        fullName
        avatar
      }
    }
  }
`;

export default function Dashboard() {
  const { loading, data, error } = useQuery<TaskInventoryData, TaskInventoryVars>(
    GET_TASK_INVENTORY,
    { variables: { input: {} } }
  );

  if (error) {
    return <Text color="red">Error: {error.message}</Text>;
  }

  if (loading) {
    return (
      <Box w="1108px">
        <ScrollArea h="78vh">
        <Group gap={25} justify="start" p={4} pt={0} align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
          <Stack w={348} gap={12}>
            <Text size="18px" fw={600} mb={10}>Backlog (?)</Text>
            <Skeleton h={208} />
            <Skeleton h={208} />
            <Skeleton h={208} />
          </Stack>
          <Stack w={348} gap={12}>
            <Text size="18px" fw={600} mb={10}>Cancelled (?)</Text>
            <Skeleton h={208} />
            <Skeleton h={208} />
          </Stack>
          <Stack w={348} gap={20}>
            <Text size="18px" fw={600}>Done (?)</Text>
            <Skeleton h={208} />
            <Skeleton h={208} />
            <Skeleton h={208} />
          </Stack>
          <Stack w={348} gap={20}>
            <Text size="18px" fw={600}>In progress (?)</Text>
            <Skeleton h={208} />
          </Stack>
          <Stack w={348} gap={20}>
            <Text size="18px" fw={600}>Todo (?)</Text>
            <Skeleton h={208} />
          </Stack>
        </Group>
        </ScrollArea>
      </Box>
    );
  }

  const tasks_backlog = data?.tasks.filter(stack => stack.status === 'BACKLOG');
  const tasks_cancelled = data?.tasks.filter(stack => stack.status === 'CANCELLED');
  const tasks_done = data?.tasks.filter(stack => stack.status === 'DONE');
  const tasks_in_progress = data?.tasks.filter(stack => stack.status === 'IN_PROGRESS');
  const tasks_todo = data?.tasks.filter(stack => stack.status === 'TODO');

  return (
    <Box w="1108px">
      <ScrollArea h="78vh">
      <Group gap={25} justify="start" p={4} pt={0} align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>Backlog ({tasks_backlog?.length})</Text>
          {(tasks_backlog || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>Cancelled ({tasks_cancelled?.length})</Text>
          {(tasks_cancelled || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>Done ({tasks_done?.length})</Text>
          {(tasks_done || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>In progress ({tasks_in_progress?.length})</Text>
          {(tasks_in_progress || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>Todo ({tasks_todo?.length})</Text>
          {(tasks_todo || []).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Stack>
      </Group>
      </ScrollArea>
    </Box>
  );
}
