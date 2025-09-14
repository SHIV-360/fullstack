import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Shield, Building } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/fade-in';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    priceDescription: 'per month',
    description: 'For individuals starting their forensics journey.',
    features: [
      'Access to beginner investigation paths',
      'Limited access to forensic labs',
      'Community forum access',
      'Basic progress tracking',
    ],
    cta: 'Start for Free',
    href: '/signup',
    icon: <Star className="h-8 w-8 text-primary" />,
  },
  {
    name: 'Pro Analyst',
    price: '$12',
    priceDescription: 'per month',
    description: 'For serious learners who want to accelerate their career.',
    features: [
      'Access to all investigation paths',
      'Unlimited access to all forensic labs',
      'Participate in live CTF events',
      'Advanced progress tracking & analytics',
      'Certificate of completion',
    ],
    cta: 'Go Pro',
    href: '/signup',
    icon: <Shield className="h-8 w-8 text-primary" />,
    popular: true,
  },
  {
    name: 'Business',
    price: 'Custom',
    priceDescription: 'for your team',
    description: 'For organizations looking to upskill their DFIR teams.',
    features: [
      'All Pro features',
      'Team management dashboard',
      'Custom investigation paths',
      'Usage reporting',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    href: '#',
    icon: <Building className="h-8 w-8 text-primary" />,
  },
];

const faqs = [
    {
        question: "What is ForensicHub?",
        answer: "ForensicHub is an online platform for learning digital forensics through hands-on labs, guided investigation paths, and competitive Capture The Flag (CTF) events."
    },
    {
        question: "Who is ForensicHub for?",
        answer: "ForensicHub is for anyone interested in digital forensics, from absolute beginners to seasoned professionals looking to sharpen their skills or specialize in new areas."
    },
    {
        question: "Can I get a certificate?",
        answer: "Yes, certificates of completion are available for users on our Pro Analyst plan upon completing an investigation path."
    },
    {
        question: "What if I want to cancel my subscription?",
        answer: "You can cancel your Pro Analyst subscription at any time. You will retain access to Pro features until the end of your billing period."
    },
    {
        question: "Do you offer plans for educational institutions?",
        answer: "Yes, we have special programs for universities and schools. Please visit our 'For Education' page or contact us for more details."
    }
]

export default function PricingPage() {
  return (
    <>
      <section className="bg-card pt-24 md:pt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Find the Plan That's Right for You
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 font-sans">
            Whether you're just starting out or scaling your team's skills, we have a plan for you.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
             <FadeIn key={tier.name} delay={i * 0.1}>
              <Card className={`flex flex-col h-full bg-card/80 backdrop-blur-sm card-gradient-glow hover:scale-105 transition-transform duration-300 ${tier.popular ? 'border-primary border-2 relative' : ''}`}>
                {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm font-semibold text-primary-foreground bg-primary rounded-full">Most Popular</div>}
                <CardHeader className="items-center text-center">
                  {tier.icon}
                  <CardTitle className="text-3xl mt-4">{tier.name}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.priceDescription}</span>
                  </div>
                  <CardDescription className="font-sans">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-muted-foreground font-sans">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Link href={tier.href} className='w-full'>
                        <Button className="w-full" size="lg" variant={tier.popular ? 'default' : 'outline'}>
                            {tier.cta}
                        </Button>
                    </Link>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <Separator />

      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
                 <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger className='text-base text-left md:text-lg font-sans'>{faq.question}</AccordionTrigger>
                    <AccordionContent className='text-base text-muted-foreground font-sans'>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </section>
    </>
  );
}
