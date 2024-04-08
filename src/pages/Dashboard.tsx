import { Box, Group, ScrollArea, Skeleton, Stack, Text } from '@mantine/core';
import { gql, useQuery } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';
import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskInventory, TaskInventoryData } from '@/interfaces/TaskInventory';

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
        id
        fullName
        avatar
      }
    }
  }
`;

const array_status = ['BACKLOG', 'CANCELLED', 'DONE', 'IN_PROGRESS', 'TODO'];

export default function Dashboard() {
  const [search] = useOutletContext<string>();

  const { loading, data, error } = useQuery<TaskInventoryData>(
    GET_TASK_INVENTORY,
    { variables: {
        input: {
          name: search || undefined,
        },
        sort: { dueDate: 'ASC' },
      },
    }
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

  const groupBy = (xs: any[], key: string | number) => xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

  const grouped = groupBy(data?.tasks ?? [], 'status');

  for (const [key, group] of Object.entries(grouped)) {
    group.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  const taskData: any[] = [];
  array_status.forEach((status) => {
    taskData.push({
      status,
      data: grouped[status] ?? [],
    });
  });

  return (
    <Box w="1108px">
      <ScrollArea h="78vh">

      <Group gap={25} justify="start" p={4} pt={0} align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
        {taskData.map((task_h) => (
          <Stack key={task_h.status} w={348} gap={12}>
            <Text size="18px" fw={600} mb={10}>{task_h.status} ({task_h.data.length})</Text>
            {(task_h.data || []).map((task: TaskInventory) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Stack>
        ))}
      </Group>
      </ScrollArea>
    </Box>
  );
}
