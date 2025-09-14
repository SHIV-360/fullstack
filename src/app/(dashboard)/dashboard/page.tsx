
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Search,
} from 'lucide-react';
import {
  DashboardHeader,
  DashboardHeaderTitle,
  DashboardHeaderNav,
} from './components/dashboard-layout';
import {
  OngoingPaths,
  LearningHoursChart,
  TeamWidget,
  ActivityFeed,
} from './components/dashboard-cards';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    return null;
  }

  return (
    <>
      <DashboardHeader>
        <div>
          <p className="text-muted-foreground">
            Welcome back, {user.displayName}!
          </p>
          <DashboardHeaderTitle>Your Dashboard</DashboardHeaderTitle>
        </div>
        <DashboardHeaderNav>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search labs..." className="pl-9" />
          </div>
          {userData?.role === 'admin' && (
            <Badge variant="destructive">Admin</Badge>
          )}
          {userData?.subscription === 'pro' && (
            <Badge variant="outline" className="border-primary text-primary">
              Pro member
            </Badge>
          )}
        </DashboardHeaderNav>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2" />
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
             <div className="col-span-12">
               <ActivityFeed />
             </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <TeamWidget />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
