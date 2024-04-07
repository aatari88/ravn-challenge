import { Box, Group, ScrollArea, Stack, Text } from '@mantine/core';
import TaskCard from '@/components/TaskCard/TaskCard';

export default function Dashboard() {
  return (
    <Box w="1108px">
      <ScrollArea>
      <Group gap={25} justify="start" p={4} pt={0} align="flex-start" grow preventGrowOverflow={false} wrap="nowrap">
        <Stack w={348} gap={12}>
          <Text size="18px" fw={600} mb={10}>Backlog (03)</Text>
          <TaskCard />
          <TaskCard />
        </Stack>
        <Stack w={348} gap={20}>
          <Text size="18px" fw={600}>Cancelled (03)</Text>
          <TaskCard />
        </Stack>
        <Stack w={348} gap={20}>
          <Text size="18px" fw={600}>Done (03)</Text>
          <TaskCard />
        </Stack>
        <Stack w={348} gap={20}>
          <Text size="18px" fw={600}>In progress (03)</Text>
          <TaskCard />
        </Stack>
        <Stack w={348} gap={20}>
          <Text size="18px" fw={600}>Todo (03)</Text>
          <TaskCard />
        </Stack>
      </Group>
      </ScrollArea>
    </Box>
  );
}
