'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Lightbulb, ChevronLeft, ChevronRight, Copy, Share2, Sparkles, MessageSquareHeart, HeartHandshake, Wand2, MapPin, Sun } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pickupLines } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { SpouseGame } from '@/components/spouse-game';
import { AIGenerator } from '@/components/ai-generator';
import { DateGenerator } from '@/components/date-generator';
import { MTWYJournal } from '@/components/mtwy-journal';

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

  const copyToClipboard = (line: string) => {
    navigator.clipboard.writeText(line);
    toast({
      title: 'Copied!',
      description: 'The pickup line is now in your clipboard.',
    });
  };

  const shareLine = async (line: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Halal Heart Throb',
          text: line,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      copyToClipboard(line);
    }
  };

  const currentLine = pickupLines[currentIndex];
  const isFavorite = currentLine ? favorites.includes(currentLine.id) : false;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background p-4 sm:p-8">
      <div className="text-center mb-10 w-full max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          <h1 className="font-headline text-4xl md:text-6xl text-primary font-bold">Halal Heart Throb</h1>
          <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        </div>
        <p className="font-body text-muted-foreground mt-2 max-w-md mx-auto">Cultivating pious connections and strengthening marital bonds Islamically.</p>
      </div>

      <Tabs defaultValue="lines" className="w-full max-w-3xl flex flex-col items-center">
        <TabsList className="mb-8 grid w-full max-w-[800px] grid-cols-5 p-1 bg-accent/50 rounded-2xl h-14">
          <TabsTrigger value="lines" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full transition-all text-[10px] sm:text-xs md:text-sm">
            <MessageSquareHeart className="mr-2 h-4 w-4 hidden md:inline" />
            Lines
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full transition-all text-[10px] sm:text-xs md:text-sm">
            <Wand2 className="mr-2 h-4 w-4 hidden md:inline" />
            Wingman
          </TabsTrigger>
          <TabsTrigger value="game" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full transition-all text-[10px] sm:text-xs md:text-sm">
            <HeartHandshake className="mr-2 h-4 w-4 hidden md:inline" />
            Bonding
          </TabsTrigger>
          <TabsTrigger value="dates" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full transition-all text-[10px] sm:text-xs md:text-sm">
            <MapPin className="mr-2 h-4 w-4 hidden md:inline" />
            Dates
          </TabsTrigger>
          <TabsTrigger value="mtwy" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full transition-all text-[10px] sm:text-xs md:text-sm">
            <Sun className="mr-2 h-4 w-4 hidden md:inline" />
            MTWY
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lines" className="w-full focus-visible:outline-none">
          <div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full max-w-md mx-auto relative h-[500px]">
              {currentLine && (
                <div key={currentLine.id} className="absolute inset-0">
                  <Card className="shadow-2xl bg-card rounded-2xl border-2 border-primary/10 w-full h-full flex flex-col overflow-hidden transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
                        {currentLine.category}
                      </Badge>
                      <CardTitle className="font-headline text-primary/60 text-sm">Line #{currentLine.id}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center flex-grow flex items-center justify-center px-8">
                      <p className="font-body text-2xl md:text-3xl font-medium text-card-foreground leading-snug">
                        {currentLine.line}
                      </p>
                    </CardContent>
                    <CardFooter className="flex-col gap-4 pb-6 pt-0">
                      <div className="flex gap-2 w-full px-6">
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-xl h-12"
                          onClick={() => copyToClipboard(currentLine.line)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 rounded-xl h-12"
                          onClick={() => shareLine(currentLine.line)}
                        >
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>

                      <Accordion type="single" collapsible className="w-full px-6">
                        <AccordionItem value="item-1" className="border-b-0">
                          <AccordionTrigger className="w-full justify-center text-sm font-semibold text-primary hover:no-underline rounded-xl bg-accent/50 hover:bg-accent px-4 py-2 transition-colors">
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Context Tip
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 text-center text-muted-foreground italic px-2">
                            "{currentLine.context}"
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(currentLine.id)}
                        className="rounded-full h-12 w-12 hover:bg-accent group absolute top-4 right-4"
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
              )}
            </div>

            <div className="flex items-center justify-center gap-6">
              <Button onClick={handlePrevious} variant="outline" size="lg" className="rounded-full shadow-md border-primary/20 bg-card hover:bg-accent transition-all hover:scale-105 active:scale-95 h-14 w-14 p-0">
                <ChevronLeft className="h-8 w-8 text-primary" />
                <span className="sr-only">Previous</span>
              </Button>
              <div className="font-body font-bold text-primary/80 bg-accent/30 px-6 py-2 rounded-full min-w-[100px] text-center shadow-inner">
                {currentIndex + 1} / {pickupLines.length}
              </div>
              <Button onClick={handleNext} variant="outline" size="lg" className="rounded-full shadow-md border-primary/20 bg-card hover:bg-accent transition-all hover:scale-105 active:scale-95 h-14 w-14 p-0">
                <ChevronRight className="h-8 w-8 text-primary" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="w-full focus-visible:outline-none">
          <AIGenerator />
        </TabsContent>

        <TabsContent value="game" className="w-full focus-visible:outline-none">
          <SpouseGame />
        </TabsContent>

        <TabsContent value="dates" className="w-full focus-visible:outline-none">
          <DateGenerator />
        </TabsContent>

        <TabsContent value="mtwy" className="w-full focus-visible:outline-none">
          <MTWYJournal />
        </TabsContent>
      </Tabs>
    </main>
  );
}
