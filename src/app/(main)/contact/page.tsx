

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-12 md:py-20 ${className}`} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

// Note: In a real app, this form would be handled with a library like react-hook-form
// and would make an API call on submit.
export default function ContactPage() {
  return (
    <>
      <Section className="bg-card pt-24 md:pt-32">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Contact Us
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-muted-foreground mb-8">
          Have a question, comment, or suggestion? We'd love to hear from you.
        </p>
        <Separator className="my-8" />
      </Section>

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 mesh-gradient" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn>
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </div>
                            <Input type="email" placeholder="Your Email" />
                            <Input placeholder="Subject" />
                            <Textarea placeholder="Your message..." rows={6} />
                            <Button type="submit" size="lg" className="w-full">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold">Get In Touch</h2>
                    <p className="text-muted-foreground">
                        Our team is available to assist you. Reach out through any of the channels below.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-primary" />
                            <span className="text-lg">contact@forensichub.com</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-primary" />
                            <span className="text-lg">(123) 456-7890</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <span className="text-lg">123 Forensic Ave,<br />Investigation City, 10112</span>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
      </Section>
    </>
  );
}
