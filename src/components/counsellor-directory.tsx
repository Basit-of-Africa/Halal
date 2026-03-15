'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Globe } from 'lucide-react';
import { counsellors } from '@/lib/counsellors';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CounsellorDirectory() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Resource Directory:</h4>
        <Badge variant="outline" className="text-[10px] font-normal">Faith-Based Organizations</Badge>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid gap-4">
          {counsellors.map((c) => (
            <Card key={c.id} className="border border-primary/10 shadow-sm hover:border-primary/30 transition-colors bg-card/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-bold text-primary">{c.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" asChild>
                    <a href={c.website} target="_blank" rel="noopener noreferrer" title="Visit Website">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {c.location}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {c.specialties.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[9px] px-2 py-0 h-4 bg-primary/5 text-primary border-none">
                      {s}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full h-9 rounded-lg text-xs" variant="outline" asChild>
                  <a href={c.website} target="_blank" rel="noopener noreferrer">
                    Visit Official Site
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
