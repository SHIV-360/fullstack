
import Link from 'next/link';
import { Logo } from '../icons';
import { Twitter, Linkedin, Youtube, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: <Twitter />, href: '#' },
  { icon: <Linkedin />, href: '#' },
  { icon: <Youtube />, href: '#' },
  { icon: <Facebook />, href: '#' },
];

const footerLinks = {
  Platform: [
    { href: '/', label: 'Home' },
    { href: '/laws', label: 'Laws' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/resources', label: 'Resources' },
    { href: '/playground', label: 'Playground' },
  ],
  Company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
  ],
  Resources: [
    { href: '#', label: 'Support' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Privacy Policy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ForensicHub</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A central hub for digital forensics laws, case studies, and resources.
            </p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ForensicHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
