import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LaporanPage() {
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
                  <CardTitle className="font-headline">Halaman Laporan</CardTitle>
                  <CardDescription>
                    Lihat laporan keuangan Anda dalam bentuk visual.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Konten untuk halaman laporan akan ditampilkan di sini. Ini akan mencakup berbagai grafik dan ringkasan visual data keuangan Anda.</p>
                </CardContent>
              </Card>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
