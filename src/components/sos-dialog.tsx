'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LifeBuoy, HeartOff, Users, MessageCircle, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CounsellorDirectory } from './counsellor-directory';

export function SOSDialog() {
  const [showDirectory, setShowDirectory] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog onOpenChange={(open) => !open && setShowDirectory(false)}>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            variant="destructive" 
            className="rounded-full h-14 w-14 shadow-2xl animate-bounce hover:animate-none group transition-all duration-300 hover:w-32"
          >
            <LifeBuoy className="h-6 w-6 shrink-0" />
            <span className="ml-2 hidden group-hover:inline font-bold">SOS Help</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] rounded-2xl overflow-hidden">
          {!showDirectory ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl font-headline text-destructive">
                  <HeartOff className="h-6 w-6" />
                  Seeking Peace & Healing
                </DialogTitle>
                <DialogDescription className="text-base pt-2">
                  Every marriage faces storms. Seeking help is not a sign of failure, but a sign of strength and commitment to your sacred covenant.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-primary italic text-sm text-muted-foreground">
                  "And if you fear dissension between the two, send an arbitrator from his people and an arbitrator from her people. If they both desire reconciliation, Allah will cause it between them..." (Quran 4:35)
                </div>

                <div className="grid gap-3">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Steps toward resolution:</h4>
                  
                  <Card className="border-none bg-accent/30 shadow-none">
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Professional Counseling</p>
                        <p className="text-xs text-muted-foreground">An unbiased professional can provide tools to navigate complex emotions.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-accent/30 shadow-none">
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Guided Mediation</p>
                        <p className="text-xs text-muted-foreground">Involve a trusted Imam who understands both deen and marital dynamics.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-accent/30 shadow-none">
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Spiritual Refuge</p>
                        <p className="text-xs text-muted-foreground">Increase your Tahajjud. Allah is the Turner of Hearts.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <Button 
                  className="w-full rounded-xl h-12 gap-2" 
                  variant="default" 
                  onClick={() => setShowDirectory(true)}
                >
                  View Counsellor Directory <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-[10px] text-muted-foreground mt-2">
                  If you are in immediate physical danger, please contact local emergency services immediately.
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <DialogHeader className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowDirectory(false)} className="h-8 w-8 p-0">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <DialogTitle className="text-xl font-headline text-primary">Islamic Counsellors</DialogTitle>
                </div>
                <DialogDescription>
                  Reputable faith-based organizations providing professional marital support.
                </DialogDescription>
              </DialogHeader>
              
              <CounsellorDirectory />
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="ghost" className="w-full text-xs" onClick={() => setShowDirectory(false)}>
                  Back to Guidance
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
