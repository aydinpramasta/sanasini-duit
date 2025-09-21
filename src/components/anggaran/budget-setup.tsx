'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function BudgetSetup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Anggaran Disimpan',
        description: 'Batas anggaran baru telah berhasil ditetapkan.',
      });
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline">Atur Anggaran</CardTitle>
          <CardDescription>
            Tetapkan batas pengeluaran untuk melacak keuangan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget-amount">Batas Anggaran (Rp)</Label>
            <Input id="budget-amount" type="number" placeholder="cth. 5000000" defaultValue="5000000" required />
          </div>
          <div className="space-y-2">
            <Label>Periode Anggaran</Label>
            <RadioGroup defaultValue="monthly" className="flex gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="r-weekly" />
                <Label htmlFor="r-weekly">Mingguan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="r-monthly" />
                <Label htmlFor="r-monthly">Bulanan</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Anggaran
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
