import { AppShell, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/SideBar/SideBar';
import Header from '@/components/Header/Header';

export default function Layout() {
  return (
    <AppShell
      layout="alt"
      header={{ height: 160 }}
      navbar={{ width: '25%', breakpoint: 'sm' }}
      padding="lg"
      // withBorder={false}
    >
      <AppShell.Header>
        <Group px="md" pt="lg">
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
