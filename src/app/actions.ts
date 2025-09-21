// @/app/actions.ts
'use server';

import { categorizeTransaction } from '@/ai/flows/categorize-transactions';

export async function getTransactionCategory(transactionText: string) {
  try {
    if (!transactionText) {
      return { error: 'Transaction text cannot be empty.' };
    }
    const result = await categorizeTransaction({ transactionText });
    return { category: result.category };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to categorize transaction.' };
  }
}
