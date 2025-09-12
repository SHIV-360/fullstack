
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Scale, Loader2 } from "lucide-react";
import { getLawsData } from "@/lib/api";

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-12 md:py-20 ${className || ''}`} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}


export default function LawsPage() {
    const [allLaws, setAllLaws] = useState<any[]>([]);
    const [filteredLaws, setFilteredLaws] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [jurisdiction, setJurisdiction] = useState('all');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getLawsData();
            setAllLaws(data);
            setFilteredLaws(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const results = allLaws.filter(law => {
            return (
                law.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (jurisdiction === 'all' || law.jurisdiction === jurisdiction) &&
                (category === 'all' || law.category === category)
            );
        });
        setFilteredLaws(results);
    }, [searchTerm, jurisdiction, category, allLaws]);

  const jurisdictions = [...new Set(allLaws.map(law => law.jurisdiction))];
  const categories = [...new Set(allLaws.map(law => law.category))];

  return (
    <>
      <Section className="bg-card pt-24 md:pt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Digital Forensic Laws & Regulations
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
          A searchable database of key laws, acts, and regulations relevant to digital forensics and cybersecurity.
        </p>
        <Separator className="my-8" />
      </Section>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 mesh-gradient" />
        <div className="relative z-10">
            <FadeIn>
                <Card className="mb-8 p-6 bg-card/80 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input 
                            placeholder="Search by law name..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Select value={jurisdiction} onValueChange={setJurisdiction} disabled={loading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Jurisdiction" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Jurisdictions</SelectItem>
                                {jurisdictions.map(j => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <Select value={category} onValueChange={setCategory} disabled={loading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </Card>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i} className="h-full flex flex-col bg-card/80 backdrop-blur-sm card-gradient-glow">
                             <CardHeader>
                                <CardTitle className="flex items-start gap-2"><Scale className="h-6 w-6 text-primary mt-1 shrink-0" /> Skeleton Title</CardTitle>
                                <CardDescription>Jurisdiction - Category</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">Loading summary...</p>
                            </CardContent>
                        </Card>
                    ))
                ) : filteredLaws.map((law, i) => (
                    <FadeIn key={law.id} delay={i * 0.05}>
                        <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105 transition-transform duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-start gap-2"><Scale className="h-6 w-6 text-primary mt-1 shrink-0" /> {law.title}</CardTitle>
                                <CardDescription>{law.jurisdiction} - {law.category}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{law.summary}</p>
                            </CardContent>
                        </Card>
                    </FadeIn>
                ))}
            </div>
            { !loading && filteredLaws.length === 0 && (
                <div className="text-center py-16 col-span-full">
                    <p className="text-xl text-muted-foreground">No laws match your search criteria.</p>
                </div>
            )}
        </div>
      </Section>
    </>
  );
}
