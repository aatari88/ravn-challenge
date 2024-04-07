import { ActionIcon, Avatar, Card, Group, Stack, Text } from '@mantine/core';
import { RiAlarmLine, RiAttachment2, RiChat3Line, RiMoreLine, RiNodeTree } from '@remixicon/react';
import classes from './TaskCard.module.css';

export default function TaskCard() {
  return (
    <Card className={classes.card}>
      <Group justify="space-between" mt="md" mb="xs" my={0}>
        <Text size="18px" fw={600}>Name</Text>
        <ActionIcon variant="transparent"><RiMoreLine size={24} color="gray" /></ActionIcon>
      </Group>
      <Group justify="space-between">
        <Text size="15px" fw={600}>Points</Text>
        <Group gap={8} bg="gray" h="32px" px={12} style={{ borderRadius: '4px' }}>
            <RiAlarmLine size={24} />
            <Text size="15px" fw={600}>TODAY</Text>
        </Group>
      </Group>
      <Group gap={8} mt="md" mb="xs">
        <Group h="32px" px={12} style={{ borderRadius: '4px', backgroundColor: 'rgba(112, 178, 82, 0.1)' }}>
            <Text c="#70B252" size="15px" fw={600}>IOS APP</Text>
        </Group>
        <Group h="32px" px={12} style={{ borderRadius: '4px', backgroundColor: 'rgba(229, 180, 84, 0.1)' }}>
            <Text c="#E5B454" size="15px" fw={600}>ANDROID</Text>
        </Group>
      </Group>
      <Group justify="space-between" mb={12}>
        <Avatar src="path/to/avatar.png" alt="User Avatar" />
        <Group gap={12}>
          <RiAttachment2 size={16} />
          <RiNodeTree size={16} />
          <RiChat3Line size={16} />
        </Group>
      </Group>
    </Card>
  );
}
