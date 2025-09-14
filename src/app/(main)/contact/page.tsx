import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, MessageSquare, ListCollapse, Lock, ShieldCheck, Briefcase, UserCircle2, Github, Linkedin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-12 md:py-20 ${className || ''}`} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

const commitments = [
    {
        icon: <Lock className="h-10 w-10 text-primary" />,
        title: "Strict Confidentiality",
        description: "Your privacy is paramount. All communications are handled with the utmost discretion and are protected by end-to-end encryption.",
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "Expert Guidance",
        description: "Our team consists of seasoned digital forensics professionals ready to provide accurate, actionable advice for your specific situation.",
    },
    {
        icon: <Briefcase className="h-10 w-10 text-primary" />,
        title: "Partnership Inquiries",
        description: "We welcome collaboration with law enforcement, corporations, and academic institutions to advance the field of digital forensics.",
    },
];

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    title: "Lead Cyber Analyst",
    email: "sarah.c@forensichub.com",
    linkedin: "https://www.linkedin.com/in/sarahchen",
    github: "https://github.com/sarahchen",
  },
  {
    name: "Mike Rodriguez",
    title: "Digital Forensics Investigator",
    email: "mike.r@forensichub.com",
    linkedin: "https://www.linkedin.com/in/mikerodriguez",
    github: "https://github.com/mikerodriguez",
  },
  {
    name: "Alex Kim",
    title: "Incident Response Specialist",
    email: "alex.k@forensichub.com",
    linkedin: "https://www.linkedin.com/in/alexkim",
    github: "https://github.com/alexkim",
  },
  {
    name: "Dr. Elena Davis",
    title: "Malware Reverse Engineer",
    email: "elena.d@forensichub.com",
    linkedin: "https://www.linkedin.com/in/elenadavis",
    github: "https://github.com/elenadavis",
  },
  {
    name: "James Wilson",
    title: "Threat Intelligence Analyst",
    email: "james.w@forensichub.com",
    linkedin: "https://www.linkedin.com/in/jameswilson",
    github: "https://github.com/jameswilson",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="bg-card pt-24 md:pt-32">
        <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              Contact Operations
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 font-serif">
              Our operations center is always active. Use the secure panel below to transmit your message or find direct contact channels.
            </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {commitments.map((item, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                      <Card className="bg-card/80 backdrop-blur-sm card-gradient-glow h-full">
                          <CardHeader className="items-center">
                              {item.icon}
                              <CardTitle className="mt-4 font-mono">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p className="text-muted-foreground font-sans">{item.description}</p>
                          </CardContent>
                      </Card>
                  </FadeIn>
              ))}
          </div>
        </div>
      </Section>

      <Separator />

      <Section>
        <div className="relative z-10 max-w-2xl mx-auto">
            <FadeIn>
                <Tabs defaultValue="message" className="w-full">
                    <Card className="bg-card/95 backdrop-blur-sm card-gradient-glow">
                        <CardHeader className="items-center">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="message">
                                    <MessageSquare className="mr-2"/>
                                    Secure Message
                                </TabsTrigger>
                                <TabsTrigger value="channels">
                                    <ListCollapse className="mr-2"/>
                                    Direct Channels
                                </TabsTrigger>
                            </TabsList>
                        </CardHeader>
                        <CardContent className="min-h-[520px]">
                            <TabsContent value="message">
                                <div className="text-center mb-6">
                                    <CardTitle>Transmit Secure Message</CardTitle>
                                    <CardDescription className="mt-2 font-serif">Your message will be encrypted and sent directly to our operations team.</CardDescription>
                                </div>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input aria-label="First Name or Handle" placeholder="First Name / Handle" />
                                        <Input aria-label="Last Name or Alias" placeholder="Last Name / Alias" />
                                    </div>
                                    <Input type="email" aria-label="Secure Email Address" placeholder="Your Secure Email Address" />
                                    <Input aria-label="Subject Line" placeholder="Subject Line" />
                                    <Textarea aria-label="Encrypted Message" placeholder="Your encrypted message..." rows={5} />
                                    <Button type="submit" size="lg" className="w-full">
                                        Transmit Message
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="channels">
                                <div className="text-center mb-6">
                                     <CardTitle>Alternate Channels</CardTitle>
                                    <CardDescription className="mt-2 font-serif">
                                        For direct contact or in case of emergencies, our analysts are on standby.
                                    </CardDescription>
                                </div>
                                <div className="flex flex-col justify-around font-mono h-[350px]">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Email</h3>
                                            <p className="text-muted-foreground">ops@forensichub.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Phone</h3>
                                            <p className="text-muted-foreground">(+44) 161-496-0123</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                         <div className="bg-primary/10 p-3 rounded-full">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Headquarters</h3>
                                            <p className="text-muted-foreground">123 Forensic Ave,<br />Investigation City, 10112</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Card>
                </Tabs>
            </FadeIn>
        </div>
      </Section>

      <Section className="bg-background">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground font-serif">
              Experienced professionals advancing the field of digital forensics.
            </p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="bg-card/80 backdrop-blur-sm card-gradient-glow flex flex-col items-center p-6 text-center h-full">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserCircle2 className="w-16 h-16 text-primary/70" />
                </div>
                <CardTitle className="text-xl font-mono mb-1">{member.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground font-sans">{member.title}</CardDescription>
                <div className="flex justify-center gap-4 mt-4">
                  <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}