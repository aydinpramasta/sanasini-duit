'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AddTransactionDialog } from './add-transaction-dialog';

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-card px-4 md:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl font-bold md:text-2xl font-headline">
          Dashboard
        </h1>
      </div>
      <AddTransactionDialog>
        <Button>
          <PlusCircle className="mr-2 size-4" />
          <span>Tambah Transaksi</span>
        </Button>
      </AddTransactionDialog>
    </header>
  );
}
