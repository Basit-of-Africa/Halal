'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sun, Heart, Trash2, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type GratitudeEntry = {
  id: string;
  text: string;
  timestamp: number;
};

export function MTWYJournal() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newReason, setNewReason] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('halal-heart-throb-mtwy');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse MTWY entries', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('halal-heart-throb-mtwy', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!newReason.trim()) return;

    const entry: GratitudeEntry = {
      id: Math.random().toString(36).substring(7),
      text: newReason.trim(),
      timestamp: Date.now(),
    };

    setEntries([entry, ...entries]);
    setNewReason('');
    toast({
      title: "Alhamdulillah!",
      description: "Your reason for gratitude has been saved.",
    });
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-headline font-bold text-primary">My Today With You</h2>
        <p className="text-muted-foreground text-sm italic">
          "He who does not thank people, does not thank Allah." (Tirmidhi)
        </p>
      </div>

      <Card className="shadow-xl border-2 border-primary/10 overflow-hidden">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle className="flex items-center gap-2 text-primary font-headline text-lg">
            <Heart className="h-5 w-5 fill-primary" />
            Gratitude Journal
          </CardTitle>
          <p className="text-xs text-muted-foreground">What made you smile about your spouse today?</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex gap-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="gratitude" className="sr-only">Reason for gratitude</Label>
              <Input
                id="gratitude"
                placeholder="Today I'm grateful for..."
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                className="rounded-xl h-12"
              />
            </div>
            <Button onClick={addEntry} className="h-12 w-12 rounded-xl" size="icon">
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          <ScrollArea className="h-[300px] w-full pr-4">
            {entries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-50 py-12">
                <Sun className="h-8 w-8 text-primary" />
                <p className="text-sm">No entries yet. Start the day with a grateful heart!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className="p-4 bg-accent/20 rounded-xl border border-primary/5 group relative animate-in slide-in-from-right-2 duration-300"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-sm font-body leading-relaxed">{entry.text}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-destructive/50 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <p className="text-[10px] text-center text-muted-foreground italic px-4">
        Expressing gratitude strengthens your bond and increases the blessings in your marriage.
      </p>
    </div>
  );
}
