'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { MOCK_TRANSACTIONS, formatCurrency, getCategoryInfo } from '@/lib/data';

const expensesByCategory = MOCK_TRANSACTIONS.filter((t) => t.type === 'expense').reduce((acc, t) => {
  const categoryInfo = getCategoryInfo(t.category);
  const categoryName = categoryInfo.label.split(' ')[0]; // Use first word for brevity
  if (!acc[categoryName]) {
    acc[categoryName] = 0;
  }
  acc[categoryName] += t.amount;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(expensesByCategory).map(([category, total]) => ({ category, total })).sort((a,b) => b.total - a.total);

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function SpendingChart() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Ringkasan Pengeluaran</CardTitle>
        <CardDescription>Pengeluaran bulan ini berdasarkan kategori.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(Number(value)).replace(/\,00$/, '').replace('Rp', '')}
              width={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                formatter={(value, name, props) => (
                  <div className='flex flex-col'>
                    <span className='text-muted-foreground'>{props.payload.category}</span>
                    <span className='font-bold'>{formatCurrency(value as number)}</span>
                  </div>
                )}
                indicator="dot"
              />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
