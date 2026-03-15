'use server';
/**
 * @fileOverview AI Pious Line Generator Flow.
 *
 * - generatePiousLine - Generates a custom pious pickup line based on keywords/mood.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLineInputSchema = z.object({
  topic: z.string().describe('Keywords or topics to include in the line (e.g. coffee, cats, ramadan)'),
  mood: z.enum(['Cheesy', 'Sincere', 'Spiritual', 'Funny']).describe('The desired mood of the line'),
});

const GenerateLineOutputSchema = z.object({
  line: z.string().describe('The generated pious pickup line'),
  context: z.string().describe('A short tip on when/how to use this line'),
});

export type GenerateLineInput = z.infer<typeof GenerateLineInputSchema>;
export type GenerateLineOutput = z.infer<typeof GenerateLineOutputSchema>;

export async function generatePiousLine(input: GenerateLineInput): Promise<GenerateLineOutput> {
  return generateLineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinePrompt',
  input: { schema: GenerateLineInputSchema },
  output: { schema: GenerateLineOutputSchema },
  prompt: `You are a "Halal Heart Throb" wingman. Your job is to generate a pious, Islamic-themed pickup line that is respectful, clever, and fits the requested mood.

Topic/Keywords: {{{topic}}}
Desired Mood: {{{mood}}}

Guidelines:
- Keep it respectful and within Islamic boundaries (no inappropriate content).
- Use metaphors related to faith, Islamic history, Quranic concepts, or common Muslim lifestyle.
- Be creative and avoid the most common clichés unless you can put a fresh spin on them.
- Provide a "Context Tip" on the best way to deliver the line.`,
});

const generateLineFlow = ai.defineFlow(
  {
    name: 'generateLineFlow',
    inputSchema: GenerateLineInputSchema,
    outputSchema: GenerateLineOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to generate line');
    return output;
  }
);
