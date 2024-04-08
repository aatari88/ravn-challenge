import { ActionIcon, Avatar, Box, Card, Group, Menu, Text } from '@mantine/core';
import { RiAlarmLine, RiAttachment2, RiChat3Line, RiDeleteBinLine, RiEditLine, RiMoreLine, RiNodeTree } from '@remixicon/react';
import moment from 'moment';
import { useDisclosure } from '@mantine/hooks';
import { gql, useMutation } from '@apollo/client';
import { modals } from '@mantine/modals';
import { useContext } from 'react';
import classes from './TaskCard.module.css';
import { TaskInventory } from '@/interfaces/TaskInventory';
import Tag from '../Tag/Tag';
import ModalTask from '../Modal/ModalTask';
import 'animate.css';
import { TaskContext } from '@/context/context';

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

const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;

const TaskCard: React.FC<PropTypes> = ({ task }) => {
  const { newTask } = useContext(TaskContext);

  const [opened, { open, close }] = useDisclosure(false);
  const { id, name, assignee, dueDate, pointEstimate, tags } = task;
  const [deleteTask] = useMutation(DELETE_TASK);
  const handleDelete = () => {
    deleteTask({
      variables: { input: { id: task.id } },
      update(cache) {
        cache.modify({
          fields: {
            // eslint-disable-next-line @typescript-eslint/default-param-last
            tasks(existingTasks = [], { readField }) {
              return existingTasks.filter((taskRef: any) => task.id !== readField('id', taskRef));
            },
          },
        });
      },
    });
  };

  const confirmModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => handleDelete(),
  });

  return (
    <Box className={id === newTask ? 'animate__animated animate__shakeX' : ''}>
    <Card className={classes.card}>
      <Group justify="space-between" mt="md" mb="xs" my={0}>
        <Text size="18px" fw={600}>{name}</Text>
        <Menu shadow="md" width={138} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="transparent"><RiMoreLine size={24} color="gray" /></ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<RiEditLine size={24} />} onClick={open}>
              <Text size="15px" fw={600} ml={8}>Edit</Text>
            </Menu.Item>
            <Menu.Item leftSection={<RiDeleteBinLine size={24} />} onClick={confirmModal}>
              <Text size="15px" fw={600} ml={8}>Delete</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
      <ModalTask opened={opened} close={close} task={task} />
    </Card>
    </Box>
  );
};

export default TaskCard;
