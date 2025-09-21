'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MOCK_TRANSACTIONS, formatCurrency } from '@/lib/data';
import { PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

const BUDGET_AMOUNT = 5000000; // Mock budget

export function BudgetProgress() {
  const { expense, income } = useMemo(() => {
    return MOCK_TRANSACTIONS.reduce(
      (acc, t) => {
        if (t.type === 'expense') acc.expense += t.amount;
        else if (t.type === 'income') acc.income += t.amount;
        return acc;
      },
      { expense: 0, income: 0 }
    );
  }, []);

  const progress = (expense / BUDGET_AMOUNT) * 100;
  const remaining = BUDGET_AMOUNT - expense;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Progres Anggaran Bulanan</CardTitle>
        <CardDescription>
          Anda telah menggunakan {formatCurrency(expense)} dari {formatCurrency(BUDGET_AMOUNT)}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Pengeluaran</span>
            <span className={progress > 100 ? 'text-destructive' : 'text-foreground'}>
              {formatCurrency(expense)}
            </span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.toFixed(0)}% dari Anggaran</span>
            {remaining >= 0 ? (
              <span>Sisa {formatCurrency(remaining)}</span>
            ) : (
              <span className="text-destructive">Melebihi {formatCurrency(Math.abs(remaining))}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <PiggyBank className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Anggaran</p>
              <p className="text-lg font-bold">{formatCurrency(BUDGET_AMOUNT)}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="rounded-full bg-destructive/10 p-2 text-destructive">
              <TrendingDown className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pengeluaran</p>
              <p className="text-lg font-bold">{formatCurrency(expense)}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="rounded-full bg-success/10 p-2 text-success">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pemasukan</p>
              <p className="text-lg font-bold">{formatCurrency(income)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
