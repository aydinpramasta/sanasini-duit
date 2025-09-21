import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { TransactionInput } from '@/components/dashboard/transaction-input';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <TransactionInput />
              <SummaryCards />
              <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <SpendingChart />
                </div>
                <div className="lg:col-span-2">
                  <RecentTransactions />
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
