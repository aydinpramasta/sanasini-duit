import { Coins, PiggyBank, Utensils, Car, Film, Wifi, Home, Briefcase } from 'lucide-react';

export const CATEGORIES = [
  { value: 'food', label: 'Makanan & Minuman', icon: Utensils },
  { value: 'transport', label: 'Transportasi', icon: Car },
  { value: 'entertainment', label: 'Hiburan', icon: Film },
  { value: 'utilities', label: 'Tagihan & Utilitas', icon: Wifi },
  { value: 'rent', label: 'Sewa & Cicilan', icon: Home },
  { value: 'salary', label: 'Gaji', icon: Briefcase },
  { value: 'other', label: 'Lainnya', icon: Coins },
];

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: new Date().toISOString(), description: 'Gaji bulanan', amount: 8000000, type: 'income', category: 'salary' },
  { id: '2', date: '2024-07-28T10:00:00Z', description: 'Bayar sewa apartemen', amount: 2500000, type: 'expense', category: 'rent' },
  { id: '3', date: '2024-07-28T12:30:00Z', description: 'Makan siang di Warteg', amount: 25000, type: 'expense', category: 'food' },
  { id: '4', date: '2024-07-27T19:00:00Z', description: 'Nonton bioskop', amount: 50000, type: 'expense', category: 'entertainment' },
  { id: '5', date: '2024-07-27T08:00:00Z', description: 'Naik ojek online', amount: 15000, type: 'expense', category: 'transport' },
  { id: '6', date: '2024-07-26T14:00:00Z', description: 'Belanja bulanan', amount: 750000, type: 'expense', category: 'other' },
  { id: '7', date: '2024-07-25T20:00:00Z', description: 'Bayar tagihan internet', amount: 350000, type: 'expense', category: 'utilities' },
  { id: '8', date: '2024-07-25T13:00:00Z', description: 'Beli kopi Starbucks', amount: 35000, type: 'expense', category: 'food' },
];

export const getCategoryInfo = (categoryValue: string) => {
  return CATEGORIES.find(c => c.value === categoryValue) || { value: 'other', label: 'Lainnya', icon: Coins };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
