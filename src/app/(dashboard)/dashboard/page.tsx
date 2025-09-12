
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  BookOpen,
  LayoutDashboard,
  Shield,
  Users,
  Search,
  Settings,
  Star,
  Activity,
  Trophy,
  FileText,
  Gavel,
  FlaskConical,
} from 'lucide-react';
import {
  DashboardLayout,
  DashboardNav,
  DashboardNavMain,
  DashboardNavHeader,
  DashboardNavHeaderTitle,
  DashboardNavLink,
  DashboardNavFooter,
  DashboardHeader,
  DashboardHeaderTitle,
  DashboardHeaderNav,
  DashboardMain,
} from './components/dashboard-layout';
import { UserNav } from './components/user-nav';
import {
  OngoingPaths,
  LearningHoursChart,
  TeamWidget,
  ActivityFeed,
} from './components/dashboard-cards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  const { user, loading, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // You can show a loading spinner here, or null to prevent content flash
    return null;
  }

  return (
    <DashboardLayout>
      <DashboardNav>
        <DashboardNavHeader>
          <Link href="/">
            <DashboardNavHeaderTitle>ForensicHub</DashboardNavHeaderTitle>
          </Link>
        </DashboardNavHeader>
        <DashboardNavMain>
          <DashboardNavLink href="/dashboard" active>
            <LayoutDashboard />
            Dashboard
          </DashboardNavLink>
          <DashboardNavLink href="/laws">
            <Gavel />
            Laws
          </DashboardNavLink>
          <DashboardNavLink href="/case-studies">
            <FileText />
            Case Studies
          </DashboardNavLink>
          <DashboardNavLink href="/resources">
            <BookOpen />
            Resources
          </DashboardNavLink>
           <DashboardNavLink href="/playground">
            <FlaskConical />
            Playground
          </DashboardNavLink>
        </DashboardNavMain>
        <Separator className="my-4" />
         <DashboardNavMain>
            <DashboardNavLink href="/dashboard/settings">
              <Settings />
              Settings
            </DashboardNavLink>
         </DashboardNavMain>
        <DashboardNavFooter>
          <UserNav />
        </DashboardNavFooter>
      </DashboardNav>
      <DashboardMain>
        <DashboardHeader>
          <div>
            <p className="text-muted-foreground">Welcome back, {user.displayName}!</p>
            <DashboardHeaderTitle>Your Dashboard</DashboardHeaderTitle>
          </div>
          <DashboardHeaderNav>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search labs..." className="pl-9" />
            </div>
            {userData?.role === 'admin' && <Badge variant="destructive">Admin</Badge>}
            {userData?.subscription === 'pro' && <Badge variant="outline" className='border-primary text-primary'>Pro member</Badge>}
          </DashboardHeaderNav>
        </DashboardHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">
                <LayoutDashboard className='mr-2' />
                Overview
            </TabsTrigger>
            <TabsTrigger value="paths">
                 <BookOpen className='mr-2' />
                Paths
            </TabsTrigger>
            <TabsTrigger value="team">
                <Users className='mr-2' />
                Team & Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-12 lg:col-span-8">
                 <OngoingPaths />
               </div>
               <div className="col-span-12 lg:col-span-4">
                 <LearningHoursChart />
               </div>
            </div>
          </TabsContent>

          <TabsContent value="paths">
             <OngoingPaths />
          </TabsContent>

          <TabsContent value="team">
             <div className="grid grid-cols-12 gap-6">
               <div className="col-span-12 lg:col-span-8">
                 <TeamWidget />
               </div>
                <div className="col-span-12 lg:col-span-4">
                 <ActivityFeed />
               </div>
             </div>
          </TabsContent>

        </Tabs>

      </DashboardMain>
    </DashboardLayout>
  );
}
