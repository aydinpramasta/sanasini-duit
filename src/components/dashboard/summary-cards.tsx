'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpRight, PiggyBank, Scale } from 'lucide-react';
import { MOCK_TRANSACTIONS, formatCurrency } from '@/lib/data';

export function SummaryCards() {
  const { income, expense } = MOCK_TRANSACTIONS.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = income - expense;
  const monthlyBudget = 5000000;
  const budgetRemaining = monthlyBudget - expense;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(income)}</div>
          <p className="text-xs text-muted-foreground">Bulan ini</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(expense)}</div>
          <p className="text-xs text-muted-foreground">Bulan ini</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Saat Ini</CardTitle>
          <Scale className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs text-muted-foreground">Total dari semua transaksi</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sisa Anggaran</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(budgetRemaining)}</div>
          <p className="text-xs text-muted-foreground">
            Dari {formatCurrency(monthlyBudget)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
