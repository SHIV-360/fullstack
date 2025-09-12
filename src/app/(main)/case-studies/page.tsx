
'use client';
import Link from 'next/link';
import { BookOpenCheck, Network, Database, Lock, Shield, Server, FileCode, Terminal, FileText, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/animations/fade-in';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getCaseStudiesData } from '@/lib/api';

const iconMap: { [key: string]: React.ReactNode } = {
  Network: <Network className="w-12 h-12 text-primary" />,
  Database: <Database className="w-12 h-12 text-primary" />,
  Lock: <Lock className="w-12 h-12 text-primary" />,
  Shield: <Shield className="w-12 h-12 text-primary" />,
  Terminal: <Terminal className="w-12 h-12 text-primary" />,
  Server: <Server className="w-12 h-12 text-primary" />,
  FileCode: <FileCode className="w-12 h-12 text-primary" />,
  FileText: <FileText className="w-12 h-12 text-primary" />,
  Briefcase: <Briefcase className="w-12 h-12 text-primary" />,
  Default: <BookOpenCheck className="w-12 h-12 text-primary" />,
};

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-12 md:py-20', className)} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      const data = await getCaseStudiesData();
      setCaseStudies(data);
      setLoading(false);
    };

    fetchCaseStudies();
  }, []);

  return (
    <>
      <Section className="bg-card pt-24 md:pt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Forensic Case Studies
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
          Explore real-world forensic investigations. Learn from the methods, challenges, and outcomes of notable cases.
        </p>
        <Separator className="my-8" />
      </Section>

      <Section>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-col overflow-hidden bg-card h-full">
                <CardHeader className="flex flex-row items-start gap-4 p-6">
                  <Skeleton className="w-12 h-12 rounded-md" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-4">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-5/6" />
                   <div className="flex flex-wrap gap-2 pt-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                   </div>
                </CardContent>
                <CardFooter className="p-6 bg-secondary/20 mt-auto">
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((path) => (
                  <Card key={path.id} className="card-gradient-glow flex flex-col h-full bg-card/80 backdrop-blur-sm">
                      <CardHeader className="flex flex-row items-start gap-4 p-6">
                        {iconMap[path.icon] || iconMap['Default']}
                        <div className="flex-grow">
                          <CardTitle className='font-mono'>{path.title}</CardTitle>
                          <CardDescription>{path.modulesCount} Modules</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-6">
                        <p className="text-muted-foreground mb-4">{path.description}</p>
                         <div className="flex flex-wrap gap-2">
                          {path.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 bg-transparent mt-auto">
                        <Link href={path.href || `/case-studies/${path.id}`} className='w-full'>
                          <Button className="w-full">
                            <BookOpenCheck className="mr-2 h-4 w-4" />
                            Read Case Study
                          </Button>
                        </Link>
                      </CardFooter>
                  </Card>
              ))}
            </div>
          </FadeIn>
        )}
      </Section>
    </>
  );
}
