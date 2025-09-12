
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  BookOpenCheck,
  Users,
  BarChart4,
  Network,
  Database,
  Briefcase,
  Terminal,
  FileCode,
  Server,
  ArrowRight,
  Scale,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const features = [
  {
    icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
    title: 'Learn by Doing',
    description: 'Real-world scenarios and evidence files to build your skills.',
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: 'Real Case Studies',
    description: 'Analyze famous cases and learn from expert techniques.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Community Focused',
    description: 'Join a vibrant community of analysts and professionals.',
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-primary" />,
    title: 'Track Your Progress',
    description: 'See your skills grow with our detailed progress tracking.',
  },
];

const learningPaths = [
  {
    icon: <FileText className="w-12 h-12 text-primary" />,
    title: 'Intro to Forensics',
    description: 'A structured path for those new to digital investigations.',
    modules: 5,
  },
  {
    icon: <Server className="w-12 h-12 text-primary" />,
    title: 'Memory Forensics',
    description: 'Learn to analyze RAM to uncover critical evidence.',
    modules: 8,
  },
  {
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    title: 'Jr. Forensic Analyst',
    description: 'Master the essential skills for a career in DFIR.',
    modules: 25,
  },
];

const labs = [
  {
    title: 'Memory Dump Analysis',
    category: 'Memory Forensics',
    difficulty: 'Medium',
    image: {
      src: 'https://picsum.photos/seed/memdump/600/400',
      hint: 'binary code',
    },
  },
  {
    title: 'File Carving',
    category: 'Data Recovery',
    difficulty: 'Easy',
    image: {
      src: 'https://picsum.photos/seed/filecarve/600/400',
      hint: 'data blocks',
    },
  },
  {
    title: 'PCAP Analysis',
    category: 'Network Forensics',
    difficulty: 'Hard',
    image: {
      src: 'https://picsum.photos/seed/pcap/600/400',
      hint: 'network graph',
    },
  },
  {
    title: 'Registry Rummage',
    category: 'Windows Forensics',
    difficulty: 'Easy',
    image: {
      src: 'https://picsum.photos/seed/registry/600/400',
      hint: 'windows registry',
    },
  },
];

const partners = [
  { src: 'https://picsum.photos/150/60?grayscale&random=1', alt: 'Partner 1', hint: 'company logo' },
  { src: 'https://picsum.photos/150/60?grayscale&random=2', alt: 'Partner 2', hint: 'company logo' },
  { src: 'https://picsum.photos/150/60?grayscale&random=3', alt: 'Partner 3', hint: 'company logo' },
  { src: 'https://picsum.photos/150/60?grayscale&random=4', alt: 'Partner 4', hint: 'company logo' },
  { src: 'https://picsum.photos/150/60?grayscale&random=5', alt: 'Partner 5', hint: 'company logo' },
  { src: 'https://picsum.photos/150/60?grayscale&random=6', alt: 'Partner 6', hint: 'company logo' },
];

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-12 md:py-20', className)} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

function SectionTitle({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <h2
      className={cn('text-3xl md:text-4xl font-bold text-center mb-12 text-foreground font-mono', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LearningPathsSection />
      <LabsSection />
      <CommunitySection />
      <BusinessEducationSection />
      <TrustedBySection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center text-center overflow-hidden bg-background">
       <div className="absolute inset-0 z-0 opacity-30 dark:opacity-50" style={{
         background: 'radial-gradient(circle at top left, hsla(var(--peach), 0.5) 0%, transparent 40%), radial-gradient(circle at bottom right, hsla(var(--flamingo), 0.5) 0%, transparent 50%)'
       }}></div>
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 font-mono">
          Your <span className="text-primary">Digital Forensics</span> Career Starts Here
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 font-serif">
          ForensicHub is a hands-on, interactive platform for learning digital forensics.
          Start with the basics or dive into advanced investigation techniques.
        </p>
        <Link href="/signup">
        <Button size="lg">
          Start Investigating
          <ArrowRight className="ml-2" />
        </Button>
        </Link>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="text-center bg-card/80 backdrop-blur-sm border-secondary/50 card-gradient-glow hover:scale-105 transition-transform duration-300">
            <CardHeader className="items-center">
              {feature.icon}
              <CardTitle className="mt-4 font-mono">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-sans">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function LearningPathsSection() {
  return (
    <Section className="bg-secondary/20">
      <SectionTitle>Learning Paths</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {learningPaths.map((path, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105">
            <CardHeader className="flex flex-row items-center gap-4 p-6">
              {path.icon}
              <div className="flex-grow">
                <CardTitle className="font-mono">{path.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{path.modules} Modules</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <p className="text-muted-foreground font-sans">{path.description}</p>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Button className="w-full">Start Path</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function LabsSection() {
  return (
    <Section>
      <SectionTitle>Hands-on Labs & Challenges</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {labs.map((lab, index) => (
          <Card key={index} className="group overflow-hidden transition-all duration-300 bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105">
            <div className="relative h-40">
              <Image
                src={lab.image.src}
                alt={lab.title}
                data-ai-hint={lab.image.hint}
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Badge
                variant={lab.difficulty === 'Easy' ? 'default' : lab.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                className="absolute top-2 right-2"
              >
                {lab.difficulty}
              </Badge>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{lab.category}</p>
              <h3 className="text-lg font-semibold mt-1 font-mono">{lab.title}</h3>
              <Button className="w-full mt-4" variant="outline">
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CommunitySection() {
  return (
    <Section>
      <SectionTitle>Join Our Community</SectionTitle>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-secondary/50 card-gradient-glow hover:scale-105 transition-transform duration-300">
          <Users className="h-12 w-12 mx-auto text-primary mb-4" />
          <p className="text-4xl font-bold">250,000+</p>
          <p className="text-muted-foreground font-sans">Active Analysts</p>
        </Card>
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-secondary/50 card-gradient-glow hover:scale-105 transition-transform duration-300">
          <Terminal className="h-12 w-12 mx-auto text-primary mb-4" />
          <p className="text-4xl font-bold">500+</p>
          <p className="text-muted-foreground font-sans">Forensic Labs</p>
        </Card>
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-secondary/50 card-gradient-glow hover:scale-105 transition-transform duration-300">
          <FileCode className="h-12 w-12 mx-auto text-primary mb-4" />
          <p className="text-4xl font-bold">100+</p>
          <p className="text-muted-foreground font-sans">Investigation Paths</p>
        </Card>
      </div>
    </Section>
  );
}

function BusinessEducationSection() {
  return (
    <Section className="bg-secondary/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="p-8 text-center flex flex-col items-center bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105 transition-transform duration-300">
          <Briefcase className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2 font-mono">For Business</h3>
          <p className="text-muted-foreground mb-6 flex-grow font-sans">
            Upskill your DFIR team with hands-on forensic training. Manage progress and assign investigation paths.
          </p>
          <Button variant="outline">Request a Demo</Button>
        </Card>
        <Card className="p-8 text-center flex flex-col items-center bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105 transition-transform duration-300">
          <Scale className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-2 font-mono">For Education</h3>
          <p className="text-muted-foreground mb-6 flex-grow font-sans">
            Integrate practical forensic labs into your curriculum. Free for educators and institutions.
          </p>
          <Button variant="outline">Learn More</Button>
        </Card>
      </div>
    </Section>
  );
}


function TrustedBySection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 mesh-gradient" />
      <div className="relative z-10">
        <h3 className="text-center text-xl font-semibold text-muted-foreground mb-8 font-mono">
          TRUSTED BY LEADING DFIR TEAMS & AGENCIES
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {partners.map((partner, index) => (
            <Image
              key={index}
              src={partner.src}
              alt={partner.alt}
              data-ai-hint={partner.hint}
              width={150}
              height={60}
              className="opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
