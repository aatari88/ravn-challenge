import { Box, Center, Image, NavLink, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { RiFunctionLine, RiMenuLine } from '@remixicon/react';
import { useState } from 'react';
import classes from './Sidebar.module.css';
import logo from '../../assets/logo.svg';

const data = [
  { icon: RiFunctionLine, label: 'DASHBOARD' },
  { icon: RiMenuLine, label: 'MY TASK' },
];

const Sidebar: React.FC = () => {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      leftSection={<item.icon size="24px" />}
      classNames={classes}
      className={classes.navLink}
      label={item.label}
      component={Link}
      to={index === 0 ? '/' : 'my_task'}
      active={active === index}
      onClick={() => setActive(index)}
    />
  ));

  return (
      <Box size="md" style={{ height: '100%', display: 'flex', justifyContent: 'end' }}>
        <Box w={232} bg="#2C2F33" style={{ borderRadius: '24px' }}>
          <Center mt={10} mb={50}>
            <Image
              radius="md"
              h={40}
              w="auto"
              fit="contain"
              src={logo}
            />
          </Center>
          <Stack gap="8" style={{ width: '100%' }}>
            {items}
          </Stack>

        </Box>
      </Box>
  );
};

export default Sidebar;
