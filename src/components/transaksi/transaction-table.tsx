'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, GripVertical, Trash2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Transaction,
  CATEGORIES,
  getCategoryInfo,
  formatCurrency,
} from '@/lib/data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Filter by description
        const searchMatch = filter
          ? t.description.toLowerCase().includes(filter.toLowerCase())
          : true;

        // Filter by category
        const categoryMatch =
          categoryFilter !== 'all' ? t.category === categoryFilter : true;
        
        // Filter by date
        const dateMatch = dateRange?.from
          ? new Date(t.date) >= dateRange.from && (dateRange.to ? new Date(t.date) <= dateRange.to : true)
          : true;

        return searchMatch && categoryMatch && dateMatch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filter, categoryFilter, dateRange]);

  const clearFilters = () => {
    setFilter('');
    setCategoryFilter('all');
    setDateRange(undefined);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Daftar Transaksi</CardTitle>
        <CardDescription>
          Lihat dan kelola semua transaksi Anda di satu tempat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input
            placeholder="Cari deskripsi..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  "w-full sm:w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pilih rentang tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                locale={id}
              />
            </PopoverContent>
          </Popover>

          {(filter || categoryFilter !== 'all' || dateRange) && (
             <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                <X className="mr-2 size-4"/>
                Hapus Filter
            </Button>
          )}

        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => {
                  const categoryInfo = getCategoryInfo(t.category);
                  const Icon = categoryInfo.icon;
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(t.date), 'dd MMM yyyy', { locale: id })}
                      </TableCell>
                      <TableCell className="font-medium">{t.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex items-center gap-2 w-fit">
                          <Icon className="h-3 w-3 text-muted-foreground" />
                          <span>{categoryInfo.label}</span>
                        </Badge>
                      </TableCell>
                       <TableCell>
                         <Badge variant={t.type === 'income' ? 'secondary' : 'default'} className={cn(t.type === 'income' && 'bg-success/10 text-success border-transparent hover:bg-success/20')}>
                           {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                         </Badge>
                       </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          t.type === 'income' ? 'text-success' : ''
                        }`}
                      >
                        {t.type === 'income' ? '+' : '-'}
                        {formatCurrency(t.amount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <GripVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Tidak ada transaksi ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
