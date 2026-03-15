'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LifeBuoy, HeartOff, Users, MessageCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SOSDialog() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
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
        <DialogContent className="sm:max-w-[500px] rounded-2xl">
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
                    <p className="text-xs text-muted-foreground">An unbiased professional can provide tools to navigate complex emotions and patterns that are hard to see from within.</p>
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
                    <p className="text-xs text-muted-foreground">Involve a trusted Imam or an elder who understands both the deen and the nuances of marital dynamics.</p>
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
                    <p className="text-xs text-muted-foreground">Increase your Tahajjud and individual prayers. Allah is the Turner of Hearts.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <p className="text-center text-[10px] text-muted-foreground mb-2">
              If you are in immediate physical danger, please contact local emergency services or a domestic violence hotline immediately.
            </p>
            <Button className="w-full rounded-xl h-12 gap-2" variant="default" asChild>
              <a href="https://www.khalilcenter.com/" target="_blank" rel="noopener noreferrer">
                Find Islamic Counseling <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => {}}>
              I'm committed to making it work
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
