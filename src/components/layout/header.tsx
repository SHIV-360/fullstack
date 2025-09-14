
"use client";

import Link from 'next/link';
import { Menu, ArrowRight, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '../icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeSwitcher } from './theme-switcher';

const navLinks = [
  { href: '/laws', label: 'Laws' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/resources', label: 'Resources' },
  { href: '/playground', label: 'Playground' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-foreground" />
            <span className="font-bold text-lg">ForensicHub</span>
          </Link>
        </div>

        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                 <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                 </SheetHeader>
                 <div className="flex flex-col gap-6 pt-6 h-full">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <Logo className="h-6 w-6 text-foreground" />
                        <span className="font-bold text-lg">ForensicHub</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.label}
                        href={link.href}
                        className={cn(
                          "text-muted-foreground transition-colors hover:text-foreground",
                           pathname === link.href && "text-foreground"
                        )}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                     <div className="flex flex-col gap-4 mt-auto">
                        {!loading && !user ? (
                           <>
                            <Link href="/login">
                                <Button variant="ghost" className="w-full">Log In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="w-full">Get Started</Button>
                            </Link>
                           </>
                        ) : user && (
                           <Button onClick={logout} variant="outline" className="w-full">
                             <LogOut className="mr-2"/>
                             Logout
                           </Button>
                        )}
                    </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-muted-foreground/80 transition-colors hover:text-foreground",
                pathname.startsWith(link.href) && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="hidden md:flex items-center gap-4">
                {!loading && !user && (
                    <>
                    <Link href="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    </>
                )}
                 {!loading && user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.displayName ? getInitials(user.displayName) : 'U'}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard">
                          <DropdownMenuItem>
                            <LayoutDashboard className="mr-2" />
                            <span>Dashboard</span>
                          </DropdownMenuItem>
                        </Link>
                         <Link href="/dashboard/profile">
                          <DropdownMenuItem>
                            <UserIcon className="mr-2" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                          <LogOut className="mr-2" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                 )}
            </div>
        </div>
      </div>
    </header>
  );
}
