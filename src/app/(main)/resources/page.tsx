
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Book, PenTool, Link as LinkIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getResourcesData } from "@/lib/api";

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-12 md:py-20 ${className || ''}`} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

const iconMap = {
    Tool: <PenTool className="h-6 w-6 text-primary" />,
    Article: <Book className="h-6 w-6 text-primary" />,
    Blog: <Book className="h-6 w-6 text-primary" />,
    Default: <LinkIcon className="h-6 w-6 text-primary" />,
};

export default function ResourcesPage() {
    const [resources, setResources] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getResourcesData();
            setResources(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <Section className="bg-card pt-24 md:pt-32">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
                    Forensics Resources
                </h1>
                <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
                    A curated collection of essential tools, articles, blogs, and guides for the digital forensics community.
                </p>
                <Separator className="my-8" />
            </Section>
            <Section className="relative overflow-hidden">
                <div className="absolute inset-0 z-0 mesh-gradient" />
                <div className="relative z-10">
                    <FadeIn>
                        <div className="mb-8 max-w-lg mx-auto">
                            <Input
                                placeholder="Search resources (e.g., Volatility, NIST, Network...)"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="bg-card/80 backdrop-blur-sm"
                            />
                        </div>
                    </FadeIn>

                    {loading ? (
                         <div className="text-center py-16">
                            <Loader2 className="mx-auto h-12 w-12 animate-spin" />
                            <p className="mt-4 text-muted-foreground">Fetching resources...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredResources.map((resource, i) => (
                                <FadeIn key={resource.id || i} delay={i * 0.05}>
                                    <Card className="h-full flex flex-col group bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105 transition-transform duration-300">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="flex items-start gap-3">
                                                    {iconMap[resource.type as keyof typeof iconMap] || iconMap['Default']}
                                                    {resource.title}
                                                </CardTitle>
                                                <Badge variant="outline">{resource.type}</Badge>
                                            </div>
                                            <CardDescription>{resource.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="flex flex-wrap gap-2">
                                                {resource.tags.map((tag:string) => (
                                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardContent>
                                            <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                                                <div className="text-primary hover:underline flex items-center gap-2">
                                                    Visit Resource <LinkIcon className="h-4 w-4" />
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </FadeIn>
                            ))}
                        </div>
                    )}
                     {filteredResources.length === 0 && !loading && (
                        <div className="text-center py-16">
                            <p className="text-xl text-muted-foreground">No resources match your search.</p>
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}
