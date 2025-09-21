import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TransactionTable } from '@/components/transaksi/transaction-table';
import { MOCK_TRANSACTIONS } from '@/lib/data';


export default function TransaksiPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <TransactionTable transactions={MOCK_TRANSACTIONS} />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
