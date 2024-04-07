import { AppShell, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <AppShell
      layout="alt"
      header={{ height: 90 }}
      navbar={{ width: 264, breakpoint: 'sm' }}
      padding="md"
      // withBorder={false}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <h1>Header</h1>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <h1>SideBar</h1>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
