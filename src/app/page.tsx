'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pickupLines } from '@/lib/data';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('halal-heart-throb-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('halal-heart-throb-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  }, [favorites]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? pickupLines.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === pickupLines.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleFavorite = (id: number) => {
    const isCurrentlyFavorite = favorites.includes(id);
    setFavorites((prevFavorites) =>
      isCurrentlyFavorite
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );

    if (!isCurrentlyFavorite) {
      toast({
        title: 'Added to Favorites!',
        description: 'You can find your favorite lines later.',
      });
    }
  };

  const currentLine = pickupLines[currentIndex];
  const isFavorite = currentLine ? favorites.includes(currentLine.id) : false;

  if (!currentLine) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
        <p>No pickup lines found!</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 overflow-hidden">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl md:text-6xl text-primary font-bold">Halal Heart Throb</h1>
        <p className="font-body text-muted-foreground mt-2">Pious pickup lines for the modern Muslim.</p>
      </div>

      <div className="w-full max-w-md mx-auto relative h-[450px]">
        <div
          key={currentLine.id}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        >
          <Card className="shadow-2xl bg-card rounded-2xl border-2 border-primary/10 w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <CardHeader>
              <CardTitle className="font-headline text-center text-primary/80">Pickup Line #{currentLine.id}</CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-grow flex items-center justify-center px-6">
              <p className="font-body text-2xl font-medium text-card-foreground">{currentLine.line}</p>
            </CardContent>
            <CardFooter className="flex-col gap-4 pb-6">
              <Accordion type="single" collapsible className="w-full px-6">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="w-full justify-center text-sm font-semibold text-primary hover:no-underline rounded-lg bg-accent/50 hover:bg-accent px-4 py-2 transition-colors">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Context Tip
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-center text-muted-foreground">
                    {currentLine.context}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(currentLine.id)}
                className="rounded-full h-12 w-12 hover:bg-accent group"
                aria-label="Mark as favorite"
              >
                <Heart
                  className={`h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110 ${
                    isFavorite ? 'fill-primary' : 'fill-transparent'
                  }`}
                />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button onClick={handlePrevious} variant="outline" size="lg" className="rounded-full shadow-md border-primary/20 bg-card hover:bg-accent transition-all hover:scale-105 active:scale-95">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="font-body text-muted-foreground w-16 text-center">
          {currentIndex + 1} / {pickupLines.length}
        </div>
        <Button onClick={handleNext} variant="outline" size="lg" className="rounded-full shadow-md border-primary/20 bg-card hover:bg-accent transition-all hover:scale-105 active:scale-95">
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
      <Toaster />
    </main>
  );
}