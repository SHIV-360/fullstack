
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Terminal, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/animations/fade-in';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getLabs } from '@/lib/api';

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-12 md:py-20', className)} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export default function PlaygroundPage() {
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      const data = await getLabs();
      setLabs(data);
      setLoading(false);
    };

    fetchLabs();
  }, []);

  return (
    <>
      <Section className="bg-card pt-24 md:pt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Forensics Playground
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
          Develop practical skills in a hands-on environment. Analyze evidence, uncover artifacts, and solve forensic challenges.
        </p>
         <Separator className="my-8" />
      </Section>
      <Section>
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="group overflow-hidden shadow-lg h-full">
                  <Skeleton className="h-40 w-full" />
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
             ))}
            </div>
        ) : (
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs.map((lab) => (
                  <Card key={lab.id} className="card-gradient-glow group overflow-hidden transition-all duration-300 h-full hover:scale-105">
                    <div className="relative h-40">
                      <Image
                        src={lab.image?.src || `https://picsum.photos/seed/${lab.id}/600/400`}
                        alt={lab.title}
                        data-ai-hint={lab.image?.hint || 'abstract'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge
                        variant={lab.difficulty === 'Easy' ? 'secondary' : lab.difficulty === 'Medium' ? 'default' : 'destructive'}
                        className="absolute top-2 right-2"
                      >
                        {lab.difficulty}
                      </Badge>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <p className="text-sm text-muted-foreground">{lab.category}</p>
                      <h3 className="text-lg font-semibold mt-1 flex-grow font-mono">{lab.title}</h3>
                      <Button className="w-full mt-4" variant="outline">
                        <Terminal className="mr-2 h-4 w-4" />
                        Start Challenge
                      </Button>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </FadeIn>
        )}
      </Section>
    </>
  );
}
