'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, RefreshCw, Utensils, Mountain, Moon, Sparkles } from 'lucide-react';
import { dateIdeas, type DateIdea } from '@/lib/date-ideas';

const categoryIcons = {
  Spiritual: <Moon className="h-4 w-4" />,
  Active: <Mountain className="h-4 w-4" />,
  Relaxing: <MapPin className="h-4 w-4" />,
  Foodie: <Utensils className="h-4 w-4" />,
};

export function DateGenerator() {
  const [currentDate, setCurrentDate] = useState<DateIdea | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomDate = () => {
    setIsAnimating(true);
    // Simulate a shuffle effect
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dateIdeas.length);
      setCurrentDate(dateIdeas[randomIndex]);
      setIsAnimating(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-headline font-bold text-primary">Halal Date Night</h2>
        <p className="text-muted-foreground text-sm">
          Keep the spark alive with sunnah-inspired and halal activities.
        </p>
      </div>

      <Card className="shadow-xl border-2 border-primary/10 overflow-hidden min-h-[350px] flex flex-col">
        {currentDate ? (
          <div className={`flex flex-col flex-grow transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
                  {categoryIcons[currentDate.category]}
                  {currentDate.category}
                </Badge>
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <CardTitle className="text-xl font-headline text-primary mt-2">
                {currentDate.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-grow flex items-center justify-center">
              <p className="text-lg text-center font-body text-card-foreground leading-relaxed italic">
                "{currentDate.description}"
              </p>
            </CardContent>
          </div>
        ) : (
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4 flex-grow">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Ready for your next halal adventure?</p>
          </CardContent>
        )}
        <CardFooter className="p-6 bg-accent/5">
          <Button 
            onClick={generateRandomDate} 
            className="w-full h-12 rounded-xl text-lg font-semibold group shadow-lg"
            disabled={isAnimating}
          >
            <RefreshCw className={`mr-2 h-5 w-5 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            {currentDate ? 'Something Else?' : 'Plan Our Date'}
          </Button>
        </CardFooter>
      </Card>

      {currentDate && (
        <p className="text-[10px] text-center text-muted-foreground italic px-4">
          "And among His signs is this, that He created for you mates from among yourselves, that you may dwell in tranquility with them..." (Quran 30:21)
        </p>
      )}
    </div>
  );
}
