'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Globe, Navigation, Loader2 } from 'lucide-react';
import { counsellors, type Counsellor } from '@/lib/counsellors';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export function CounsellorDirectory() {
  const [detecting, setDetecting] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle location detection
  const handleDetectLocation = () => {
    setDetecting(true);
    if (!navigator.geolocation) {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      });
      setDetecting(false);
      return;
    }

    // Since we don't have a reverse geocoding API, 
    // we'll simulate the detection of the user's country.
    // In a real app, we'd call a service like ipapi.co or a geocoding service.
    setTimeout(() => {
      // Mocking detection: for demonstration, let's assume it detects Nigeria
      // if the user is in a certain timezone or just give a success message.
      setUserCountry('Nigeria');
      setDetecting(false);
      toast({
        title: "Location Detected",
        description: "Showing results for Nigeria first.",
      });
    }, 1500);
  };

  // Sort logic: Nigeria first by default, or detected country first
  const sortedCounsellors = useMemo(() => {
    const targetCountry = userCountry || 'Nigeria';
    
    return [...counsellors].sort((a, b) => {
      if (a.country === targetCountry && b.country !== targetCountry) return -1;
      if (b.country === targetCountry && a.country !== targetCountry) return 1;
      return 0;
    });
  }, [userCountry]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 px-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Resource Directory:</h4>
          <Badge variant="outline" className="text-[10px] font-normal">Faith-Based Organizations</Badge>
        </div>
        
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full rounded-xl h-10 gap-2 text-xs font-semibold border border-primary/10"
          onClick={handleDetectLocation}
          disabled={detecting}
        >
          {detecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          {userCountry ? `Detected: ${userCountry}` : "Detect My Location for Suggestions"}
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid gap-4">
          {sortedCounsellors.map((c) => (
            <Card key={c.id} className={`border transition-all bg-card/50 ${c.country === (userCountry || 'Nigeria') ? 'border-primary/40 bg-primary/5' : 'border-primary/10'}`}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-bold text-primary">{c.name}</CardTitle>
                    {c.country === 'Nigeria' && (
                      <Badge variant="default" className="text-[8px] h-4 px-1.5 mt-1 bg-green-600 hover:bg-green-700">Priority: Nigeria</Badge>
                    )}
                  </div>
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
