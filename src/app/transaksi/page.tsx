import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransaksiPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Halaman Transaksi</CardTitle>
                  <CardDescription>
                    Kelola semua transaksi Anda di sini.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Konten untuk halaman transaksi akan ditampilkan di sini. Ini akan mencakup tabel transaksi dengan fitur pencarian dan filter.</p>
                </CardContent>
              </Card>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
