'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Coins,
  LayoutDashboard,
  Wallet,
  Settings,
  PieChart,
  User,
  CreditCard,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { useSidebar } from '@/hooks/use-sidebar';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/transaksi', label: 'Transaksi', icon: CreditCard, tooltip: 'Transaksi' },
  { href: '/laporan', label: 'Laporan', icon: PieChart, tooltip: 'Laporan' },
  { href: '/anggaran', label: 'Anggaran', icon: Wallet, tooltip: 'Anggaran' },
  { href: '/pengaturan', label: 'Pengaturan', icon: Settings, tooltip: 'Pengaturan' },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Coins className="text-primary size-8 shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <h2 className="text-lg font-bold tracking-tight font-headline truncate">
              SanaSini Duit
            </h2>
            <p className="text-xs text-muted-foreground">Lite Version</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.tooltip}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 px-2">
              <Avatar className="size-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=sanisini" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {state === 'expanded' && (
                <div className="flex flex-col items-start truncate">
                  <span className="font-medium text-sm">Pengguna</span>
                  <span className="text-xs text-muted-foreground">user@email.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
