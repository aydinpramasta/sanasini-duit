'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MOCK_TRANSACTIONS, getCategoryInfo, formatCurrency } from '@/lib/data';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { ScrollArea } from '../ui/scroll-area';

export function RecentTransactions() {
  const recentTransactions = [...MOCK_TRANSACTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Transaksi Terbaru</CardTitle>
        <CardDescription>Anda memiliki {MOCK_TRANSACTIONS.length} transaksi bulan ini.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[350px]">
            <div className="p-6 pt-0 space-y-4">
            {recentTransactions.map((t) => {
            const categoryInfo = getCategoryInfo(t.category);
            const Icon = categoryInfo.icon;
            return (
                <div key={t.id} className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-secondary">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-1">
                    <p className="text-sm font-medium leading-none truncate">{t.description}</p>
                    <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(t.date), { addSuffix: true, locale: id })}
                    </p>
                </div>
                <div
                    className={`text-sm font-medium shrink-0 ${
                    t.type === 'income' ? 'text-success' : ''
                    }`}
                >
                    {t.type === 'income' ? '+' : '-'}
                    {formatCurrency(t.amount)}
                </div>
                </div>
            );
            })}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
