import { AppShell, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '@/components/SideBar/SideBar';
import Header from '@/components/Header/Header';

export default function Layout() {
  const [search, setSearch] = useState('');
  return (
    <AppShell
      layout="alt"
      header={{ height: 160 }}
      navbar={{ width: '25%', breakpoint: 'sm' }}
      padding="lg"
      withBorder={false}
    >
      <AppShell.Header>
        <Group px="md" pt="lg">
          <Header search={search} setSearch={setSearch} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet context={[search]} />
      </AppShell.Main>
    </AppShell>
  );
}
