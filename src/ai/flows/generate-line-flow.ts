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

/**
 * Wrapper function to call the AI flow.
 */
export async function generatePiousLine(input: GenerateLineInput): Promise<GenerateLineOutput> {
  return generateLineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinePrompt',
  input: { schema: GenerateLineInputSchema },
  output: { schema: GenerateLineOutputSchema },
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ],
  },
  prompt: `You are an expert "Halal Wingman" for the app "Halal Heart Throb". 
Your mission is to create a pious, Islamic-themed pickup line that is respectful, clever, and matches the requested mood.

Topic/Keywords: {{{topic}}}
Desired Mood: {{{mood}}}

Guidelines:
1. Stay strictly within Islamic boundaries. No inappropriate or suggestive language.
2. Use metaphors related to faith, Quranic concepts, Islamic history, or modern Muslim life (like prayer, fasting, charity, or sunnah sports).
3. Be creative and unique. 
4. Provide a "Context Tip" on the best way to deliver the line respectfully.`,
});

const generateLineFlow = ai.defineFlow(
  {
    name: 'generateLineFlow',
    inputSchema: GenerateLineInputSchema,
    outputSchema: GenerateLineOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI wingman was unable to generate a response. Please try different keywords.');
    }
    return output;
  }
);
