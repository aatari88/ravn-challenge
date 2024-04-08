import { Box, Button, Group, Modal, MultiSelect, Select, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { RiDice5Line, RiPriceTagLine, RiUser3Line } from '@remixicon/react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { TaskInventory, TaskInventoryData } from '@/interfaces/TaskInventory';
import { UserData } from '@/interfaces/User';

const dataEstimate = [
  { value: 'ZERO', label: '0 Points' },
  { value: 'ONE', label: '1 Points' },
  { value: 'TWO', label: '2 Points' },
  { value: 'THREE', label: '3 Points' },
  { value: 'FOUR', label: '4 Points' },
  { value: 'FIVE', label: '5 Points' },
  { value: 'SIX', label: '6 Points' },
  { value: 'SEVEN', label: '7 Points' },
  { value: 'EIGHT', label: '8 Points' },
  { value: 'NINE', label: '9 Points' },
  { value: 'TEN', label: '10 Points' },
];

const dataLabel = [
  { value: 'ANDROID', label: 'ANDROID' },
  { value: 'RAILS', label: 'RAILS' },
  { value: 'NODE_JS', label: 'NODE_JS' },
  { value: 'REACT', label: 'REACT' },
  { value: 'IOS', label: 'IOS' },
];

const GET_USERS = gql`
  query Users {
    users {
      id,
      avatar,
      fullName
    }
  }
`;

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

const ADD_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
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

interface PropTypes {
  task?: TaskInventory;
  opened: boolean;
  close: () => void;
}

const ModalTask: React.FC<PropTypes> = ({ task, opened, close }) => {
  const [addTask] = useMutation(ADD_TASK);
  const [changeTask] = useMutation(UPDATE_TASK);
  const [, setDate] = useState<Date>(new Date());

  const { data } = useQuery<UserData>(
    GET_USERS,
  );

  const users = data?.users.map((user) => ({ value: user.id, label: user.fullName }));

  // if (loading) console.log('loading...');
  // if (error) console.log(error.message);

  const onSubmit = (info: any) => {
    if (task) {
      changeTask({
        variables: { input: { ...info, id: task.id } },
        update: (cache, { data: { updateTask } }) => {
          const tasks_cache = cache.readQuery<TaskInventoryData>({
            query: GET_TASK_INVENTORY,
            variables: { input: {} },
          }) || { tasks: [] };
          cache.writeQuery({
            query: GET_TASK_INVENTORY,
            variables: { input: {} },
            data: {
              tasks: tasks_cache.tasks.map((t) => (t.id === updateTask.id ? updateTask : t)),
            },
          });
        },
      });
      close();
    } else {
      addTask({
        variables: { input: info },
        update: (cache, { data: { createTask } }) => {
          const tasks_cache = cache.readQuery<TaskInventoryData>({
            query: GET_TASK_INVENTORY,
            variables: { input: {} },
          }) || { tasks: [] };
          cache.writeQuery({
            query: GET_TASK_INVENTORY,
            variables: { input: {} },
            data: {
              tasks: [...tasks_cache.tasks, createTask],
            },
          });
        },
      });
      close();
    }
  };

  const form = useForm({
    initialValues: {
      name: task?.name || '',
      assigneeId: task?.assignee.id || '',
      status: task?.status || 'BACKLOG',
      pointEstimate: task?.pointEstimate || '',
      tags: task?.tags || [],
      dueDate: task?.dueDate,
    },

    validate: {
      name: (value) => value === '',
      assigneeId: (value) => value === '',
      pointEstimate: (value) => value === '',
      tags: (value) => value.length === 0,
    },
  });

  const confirmModal = (info: any) => modals.openConfirmModal({
    title: 'Please confirm your action',
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => onSubmit(info),
  });

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered size={572}>
      <Box>
        <form onSubmit={form.onSubmit(confirmModal)}>
          <Stack gap={20} p={20}>
            <TextInput
              data-autofocus
              {...form.getInputProps('name')}
              variant="unstyled"
              placeholder="Task Title"
              size="20px"
            />
            <Group grow>
              <Select
                data={dataEstimate}
                leftSection={<RiDice5Line />}
                placeholder="Estimate"
                {...form.getInputProps('pointEstimate')}
              />
              <Select
                data={users}
                leftSection={<RiUser3Line />}
                placeholder="Assignee"
                {...form.getInputProps('assigneeId')}
              />
              <DateInput
                value={form.values.dueDate ? new Date(form.values.dueDate) : undefined}
                onChange={(value) => {
                  form.setFieldValue('dueDate', value?.toISOString());
                  if (value) {
                    setDate(value);
                  }
                }}
                clearable
                defaultValue={new Date()}
                placeholder="Date input"
              />
            </Group>
            <Group grow>
              <MultiSelect
                data={dataLabel}
                leftSection={<RiPriceTagLine />}
                placeholder="Label"
                {...form.getInputProps('tags')}
              />
            </Group>
            <Group justify="flex-end">
              <Button variant="subtle" color="gray" onClick={close}>Cancel</Button>
              <Button color="red" type="submit">{ task ? 'Update' : 'Create'}</Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalTask;
