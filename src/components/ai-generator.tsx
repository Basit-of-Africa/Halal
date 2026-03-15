'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy, Share2, Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { generatePiousLine, type GenerateLineOutput } from '@/ai/flows/generate-line-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export function AIGenerator() {
  const [topic, setTopic] = useState('');
  const [mood, setMood] = useState<'Cheesy' | 'Sincere' | 'Spiritual' | 'Funny'>('Sincere');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateLineOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Need a topic!",
        description: "Please enter some keywords to help the AI wingman.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const output = await generatePiousLine({ topic, mood });
      setResult(output);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "The AI wingman is taking a break. Try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Your custom line is ready to use.',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="shadow-xl border-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="flex items-center gap-2 text-primary font-headline">
            <Wand2 className="h-5 w-5" />
            AI Halal Wingman
          </CardTitle>
          <p className="text-xs text-muted-foreground italic">Generate custom pious lines based on your "intended's" interests.</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic or Interests</Label>
            <Input
              id="topic"
              placeholder="e.g. coffee, coding, physics, kittens..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mood">Desired Mood</Label>
            <Select value={mood} onValueChange={(v: any) => setMood(v)}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Select mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cheesy">Cheesy 🧀</SelectItem>
                <SelectItem value="Sincere">Sincere ❤️</SelectItem>
                <SelectItem value="Spiritual">Spiritual ✨</SelectItem>
                <SelectItem value="Funny">Funny 😂</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleGenerate} 
            className="w-full h-12 rounded-xl text-lg font-semibold group"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            )}
            {loading ? 'Generating...' : 'Craft My Line'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-2xl bg-card rounded-2xl border-2 border-primary/20 animate-in zoom-in-95 duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
              {mood} (Custom AI)
            </Badge>
          </CardHeader>
          <CardContent className="text-center p-8 pt-2">
            <p className="font-body text-2xl font-medium text-card-foreground leading-snug">
              "{result.line}"
            </p>
            <div className="mt-6 p-4 bg-accent/30 rounded-xl text-sm text-muted-foreground italic flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-primary shrink-0" />
              <p>{result.context}</p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 p-6 pt-0">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-12"
              onClick={() => copyToClipboard(result.line)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-12"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'AI Pious Line', text: result.line });
                } else {
                  copyToClipboard(result.line);
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
