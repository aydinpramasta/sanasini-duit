'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTransactionCategory } from '@/app/actions';

const formSchema = z.object({
  transaction: z.string().min(3, { message: 'Masukkan transaksi yang lebih detail.' }),
});

export function TransactionInput() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transaction: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await getTransactionCategory(values.transaction);
    setIsSubmitting(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Gagal Memproses',
        description: result.error,
      });
    } else {
      toast({
        title: 'Transaksi Dicatat!',
        description: `"${values.transaction}" dikategorikan sebagai: ${result.category}.`,
      });
      form.reset();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Pencatatan Cepat</CardTitle>
        <CardDescription>
          Ketik transaksi Anda dan biarkan AI mengkategorikannya. Contoh: "Beli kopi Starbucks 35.000"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2 sm:gap-4">
            <FormField
              control={form.control}
              name="transaction"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="cth. Bayar parkir 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} size="icon">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Kirim</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
