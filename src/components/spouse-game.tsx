'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ChevronLeft, ChevronRight, RotateCcw, Play, BookOpen } from 'lucide-react';
import { spouseQuestions, type SpouseQuestion } from '@/lib/spouse-questions';

export function SpouseGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState<SpouseQuestion[]>([]);

  const startGame = () => {
    // Shuffle and pick N questions
    const shuffled = [...spouseQuestions].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled.slice(0, questionCount));
    setCurrentIndex(0);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
        <div className="text-center max-w-sm space-y-4">
          <BookOpen className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-3xl font-headline font-bold text-primary">Marital Bond Game</h2>
          <p className="text-muted-foreground text-sm">
            Strengthen your relationship with 100 deep, Islamic-centered questions. Select how many you'd like to discuss today.
          </p>
        </div>

        <Card className="w-full max-w-sm p-6 shadow-xl border-2 border-primary/10">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Number of Questions</span>
                <span className="text-primary font-bold">{questionCount}</span>
              </div>
              <Slider
                value={[questionCount]}
                onValueChange={(val) => setQuestionCount(val[0])}
                min={5}
                max={50}
                step={5}
                className="py-4"
              />
              <p className="text-[10px] text-muted-foreground text-center italic">
                Choose between 5 and 50 questions for this session.
              </p>
            </div>
            <Button onClick={startGame} className="w-full h-12 text-lg rounded-xl shadow-lg" size="lg">
              <Play className="mr-2 h-5 w-5" /> Start Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = sessionQuestions[currentIndex];

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center px-2">
        <Button variant="ghost" size="sm" onClick={resetGame} className="text-muted-foreground">
          <RotateCcw className="mr-2 h-4 w-4" /> New Session
        </Button>
        <div className="text-sm font-bold text-primary/70 bg-accent/30 px-3 py-1 rounded-full">
          {currentIndex + 1} / {sessionQuestions.length}
        </div>
      </div>

      <Card className="shadow-2xl bg-card rounded-2xl border-2 border-primary/10 min-h-[350px] flex flex-col relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
            {currentQuestion.category}
          </Badge>
          <span className="text-[10px] text-muted-foreground font-mono">Q#{currentQuestion.id}</span>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center p-8 text-center">
          <p className="text-2xl md:text-3xl font-headline text-card-foreground leading-snug">
            {currentQuestion.question}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between gap-4 p-6 border-t bg-accent/5 mt-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 rounded-xl h-14"
          >
            <ChevronLeft className="mr-2 h-6 w-6" /> Previous
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === sessionQuestions.length - 1}
            className="flex-1 rounded-xl h-14 shadow-md"
          >
            Next <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </CardFooter>
      </Card>
      
      {currentIndex === sessionQuestions.length - 1 && (
        <div className="text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <p className="text-primary font-bold mb-2">BarakAllah! Session Complete.</p>
          <Button variant="link" onClick={resetGame}>Start a new session?</Button>
        </div>
      )}
    </div>
  );
}
