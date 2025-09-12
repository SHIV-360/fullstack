
'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, FileQuestion, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// In a real app, you would fetch this data from an API based on the path ID in the URL
// import { getPathDetails } from '@/lib/api';

const mockPathData = {
    id: 'intro-to-forensics',
    title: 'Intro to Digital Forensics',
    description: 'Learn the foundational principles of digital forensics, from evidence handling to basic analysis techniques.',
    modules: [
      {
        title: 'Module 1: The Basics',
        description: 'Understanding the forensic process and legal considerations.',
        tasks: [
          { title: 'The Forensic Investigation Process', completed: true, type: 'reading' },
          { title: 'Chain of Custody', completed: true, type: 'lab' },
          { title: 'Legal & Ethical Guidelines', completed: false, type: 'reading' },
        ],
      },
      {
        title: 'Module 2: Evidence Acquisition',
        description: 'Learn to properly acquire digital evidence from various sources.',
        tasks: [
          { title: 'Disk Imaging Fundamentals', completed: false, type: 'lab' },
          { title: 'Volatile Data Collection', completed: false, type: 'lab' },
          { title: 'Mobile Device Acquisition', completed: false, type: 'lab' },
        ],
      },
       {
        title: 'Module 3: File System Analysis',
        description: 'Dive into the structure of common file systems.',
        tasks: [
          { title: 'FAT vs. NTFS vs. Ext4', completed: false, type: 'reading' },
          { title: 'Analyzing the Master File Table (MFT)', completed: false, type: 'lab' },
        ],
      },
    ]
};


export default function PathDetailPage() {
  const [pathData, setPathData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      setLoading(true);
      // const pathId = window.location.pathname.split('/').pop() || '';
      // const data = await getPathDetails(pathId);
      const data = mockPathData; // Using mock for now
      setPathData(data);
      setLoading(false);
    };

    fetchPath();
  }, []);

  if (loading || !pathData) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/3 lg:w-1/4">
             <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-10 h-10 rounded" />
                    <Skeleton className="h-7 w-3/4" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                   <Skeleton className="h-4 w-full" />
                   <Skeleton className="h-4 w-5/6" />
                   <div className="space-y-2 pt-2">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-1/2" />
                   </div>
                   <Skeleton className="h-10 w-full mt-2" />
                </CardContent>
             </Card>
          </aside>
          <main className="w-full md:w-2/3 lg:w-3/4">
             <Skeleton className="h-10 w-1/2 mb-2" />
             <Skeleton className="h-5 w-3/4 mb-8" />
             <div className="space-y-4">
                {Array.from({length: 6}).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
             </div>
          </main>
        </div>
      </div>
    );
  }

  const modules = pathData.modules || [];
  const completedTasks = modules.flatMap((m: any) => m.tasks).filter((t: any) => t.completed).length;
  const totalTasks = modules.flatMap((m: any) => m.tasks).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <Card className="sticky top-24 card-gradient-glow bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Terminal className="w-10 h-10 text-primary" />
                <CardTitle className="text-2xl">{pathData.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-sans">
                {pathData.description}
              </p>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{completedTasks} / {totalTasks} Tasks</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
              <Button className="w-full mt-2">Continue Investigation</Button>
            </CardContent>
          </Card>
        </aside>

        <main className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-4xl font-bold mb-2 font-mono">Case Files</h1>
          <p className="text-muted-foreground mb-8 font-serif">Work through the modules below to complete the investigation path.</p>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {modules.map((module: any, index: number) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-card/80 backdrop-blur-sm border rounded-lg card-gradient-glow">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className="text-xl font-bold">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold font-mono">{module.title}</h3>
                      <p className="text-sm text-muted-foreground font-sans">{module.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <ul className="space-y-3 pl-16">
                    {module.tasks.map((task: any) => (
                      <li key={task.title} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <CheckCircle className={cn('h-5 w-5', task.completed ? 'text-green-500' : 'text-muted-foreground/30')} />
                          <span className={cn(task.completed ? 'text-foreground' : 'text-muted-foreground', 'font-sans')}>
                            {task.title}
                          </span>
                        </div>
                        <div className='flex gap-2'>
                          <Button variant="outline" size="sm">
                             <FileQuestion className="mr-2 h-4 w-4" />
                            Read Intel
                          </Button>
                           <Button variant="secondary" size="sm">
                            <Terminal className="mr-2 h-4 w-4" />
                            Open Lab
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </div>
    </div>
  );
}
