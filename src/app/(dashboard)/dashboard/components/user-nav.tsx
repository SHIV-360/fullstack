
'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth-context';
import { LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function UserNav() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-2 p-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL || ''}
              alt={user.displayName || 'User'}
            />
            <AvatarFallback>
              {user.displayName ? getInitials(user.displayName) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className={cn("text-left", state === 'collapsed' && 'hidden')}>
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
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
  );
}
