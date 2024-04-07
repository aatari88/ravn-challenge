import { Avatar, Group, Box, TextInput, ActionIconGroup, ActionIcon, Stack } from '@mantine/core';
import { RiAddLine, RiFunctionLine, RiMenuLine, RiSearchLine } from '@remixicon/react';
import { useState } from 'react';

const Header = () => {
  const [search, setSearch] = useState('');
    return (
      <Box size="md" style={{ display: 'flex', justifyContent: 'left' }}>
        <Stack gap={25} style={{ width: '100%' }}>
          <Box w="1108" bg="#2C2F33" style={{ borderRadius: '16px', display: 'flex', alignItems: 'center' }}>
            <Group justify="space-between" h={64} w="100%" px={20}>
              <TextInput variant="unstyled" placeholder="Search" leftSection={<RiSearchLine size={16} />} />
              <Avatar src="path/to/avatar.png" alt="User Avatar" />
            </Group>
          </Box>
          <Group justify="space-between" p={4}>
            <ActionIconGroup>
              <Group gap={1}>
                <ActionIcon aria-label="Action icon" variant="transparent" size={40}><RiMenuLine /></ActionIcon>
                <ActionIcon aria-label="Action icon" variant="outline" size={40}><RiFunctionLine /></ActionIcon>
              </Group>
            </ActionIconGroup>
            <ActionIcon
              variant="filled"
              color="#DA584B"
              size={40}
            >
              <RiAddLine />
            </ActionIcon>
          </Group>
        </Stack>
      </Box>
    );
};

export default Header;
