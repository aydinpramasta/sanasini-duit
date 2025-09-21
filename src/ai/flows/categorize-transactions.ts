'use server';

/**
 * @fileOverview AI-powered transaction categorization flow.
 *
 * - categorizeTransaction - A function that categorizes a transaction.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  transactionText: z
    .string()
    .describe('The text of the transaction to categorize, e.g. \'Beli kopi Starbucks 35.000\''),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z.string().describe('The category of the transaction, e.g. food, transport, etc.'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(input: CategorizeTransactionInput): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a personal finance expert. You will categorize transactions based on their description.

  Transaction: {{{transactionText}}}

  Respond with ONLY the category name.  Do not include any other text, punctuation, or formatting.
  Valid categories are: food, transport, entertainment, utilities, rent, salary, other.
  If you are unsure, categorize the transaction as \'other\'.`,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
