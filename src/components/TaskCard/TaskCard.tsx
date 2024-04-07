import { ActionIcon, Avatar, Card, Group, Text } from '@mantine/core';
import { RiAlarmLine, RiAttachment2, RiChat3Line, RiMoreLine, RiNodeTree } from '@remixicon/react';
import moment from 'moment';
import classes from './TaskCard.module.css';
import { TaskInventory } from '@/interfaces/TaskInventory';
import Tag from '../Tag/Tag';

interface PropTypes {
  task: TaskInventory;
}

const numbers = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'];
const TextDueTime = ({ dueDate }: { dueDate: string }) => {
  if (moment().isAfter(dueDate, 'days')) {
    return (
      <Group gap={8} h="32px" px={12} style={{ borderRadius: '4px', backgroundColor: 'rgba(218, 88, 75, 0.1)', color: '#DA584B' }}>
        <RiAlarmLine size={24} />
        <Text size="15px" fw={600} tt="uppercase">
          { moment().diff(dueDate, 'days') === 1 ? 'YESTERDAY' : moment(dueDate).format('DD MMMM, YYYY') }
        </Text>
      </Group>
    );
  }
  if (moment().diff(dueDate, 'days') >= -1) {
    return (
      <Group gap={8} h="32px" px={12} style={{ borderRadius: '4px', backgroundColor: 'rgba(229, 180, 84, 0.1)', color: '#E5B454' }}>
        <RiAlarmLine size={24} />
        <Text size="15px" fw={600} tt="uppercase">
        { moment().diff(dueDate, 'days') === 0 ? 'TODAY' : 'TOMORROW' }
        </Text>
      </Group>
    );
  }
  return (
    <Group gap={8} bg="gray" h="32px" px={12} style={{ borderRadius: '4px' }}>
      <RiAlarmLine size={24} />
      <Text size="15px" fw={600} tt="uppercase">
        { moment().diff(dueDate, 'days') === 0 ? 'TODAY' : moment(dueDate).format('DD MMMM, YYYY') }
      </Text>
    </Group>
  );
};

const TaskCard: React.FC<PropTypes> = ({ task }) => {
  const { name, assignee, dueDate, pointEstimate, tags } = task;
  return (
    <Card className={classes.card}>
      <Group justify="space-between" mt="md" mb="xs" my={0}>
        <Text size="18px" fw={600}>{name}</Text>
        <ActionIcon variant="transparent"><RiMoreLine size={24} color="gray" /></ActionIcon>
      </Group>
      <Group justify="space-between">
        <Text size="15px" fw={600}>{numbers.findIndex(e => e === pointEstimate)} Points</Text>
        { TextDueTime({ dueDate }) }
      </Group>
      <Group gap={8} mt="md" mb="xs">
        <Tag tags={tags} />
      </Group>
      <Group justify="space-between" mb={12}>
        <Avatar src={assignee.avatar} alt="User Avatar" />
        <Group gap={12}>
          <RiAttachment2 size={16} />
          <RiNodeTree size={16} />
          <RiChat3Line size={16} />
        </Group>
      </Group>
    </Card>
  );
};

export default TaskCard;
