import { PageTransitionWrapper } from '@/components/animations/page-transition-wrapper';
import {
  DashboardLayout,
  DashboardNav,
  DashboardNavMain,
  DashboardNavHeader,
  DashboardNavHeaderTitle,
  DashboardNavLink,
  DashboardNavFooter,
  DashboardMain,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
} from './dashboard/components/dashboard-layout';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  FileText,
  FlaskConical,
  Gavel,
  LayoutDashboard,
  Settings,
  Sparkles,
  Swords,
  User,
} from 'lucide-react';
import { UserNav } from './dashboard/components/user-nav';

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <PageTransitionWrapper>
        <DashboardLayout>
          <DashboardNav>
            <DashboardNavHeader>
              <Link href="/">
                <DashboardNavHeaderTitle>ForensicHub</DashboardNavHeaderTitle>
              </Link>
            </DashboardNavHeader>
            <DashboardNavMain>
                <SidebarGroup>
                    <SidebarGroupLabel className='flex items-center gap-2'><Sparkles className="h-4 w-4" /> Analysis</SidebarGroupLabel>
                    <SidebarMenu>
                        <DashboardNavLink href="/dashboard">
                           <span><LayoutDashboard className="h-4 w-4" />Dashboard</span>
                        </DashboardNavLink>
                        <DashboardNavLink href="/dashboard/profile">
                            <span><User className="h-4 w-4" />Profile</span>
                        </DashboardNavLink>
                    </SidebarMenu>
                </SidebarGroup>
                
                <Separator className="my-2" />

                <SidebarGroup>
                    <SidebarGroupLabel className='flex items-center gap-2'><BookOpen className="h-4 w-4" /> Reference Library</SidebarGroupLabel>
                    <SidebarMenu>
                        <DashboardNavLink href="/laws">
                            <span><Gavel className="h-4 w-4" />Laws</span>
                        </DashboardNavLink>
                        <DashboardNavLink href="/case-studies">
                           <span><FileText className="h-4 w-4" />Case Studies</span>
                        </DashboardNavLink>
                        <DashboardNavLink href="/resources">
                           <span><BookOpen className="h-4 w-4" />Resources</span>
                        </DashboardNavLink>
                    </SidebarMenu>
                </SidebarGroup>

                <Separator className="my-2" />
                
                 <SidebarGroup>
                     <SidebarGroupLabel className='flex items-center gap-2'><FlaskConical className="h-4 w-4" />Practice</SidebarGroupLabel>
                     <SidebarMenu>
                        <DashboardNavLink href="/playground">
                            <span><FlaskConical className="h-4 w-4" />Playground</span>
                        </DashboardNavLink>
                    </SidebarMenu>
                </SidebarGroup>

                 <Separator className="my-2" />
                
                 <SidebarGroup>
                     <SidebarGroupLabel className='flex items-center gap-2'><Swords className="h-4 w-4" />Competitions</SidebarGroupLabel>
                     <SidebarMenu>
                        <DashboardNavLink href="/compete">
                            <span><Swords className="h-4 w-4" />CTFs</span>
                        </DashboardNavLink>
                    </SidebarMenu>
                </SidebarGroup>

            </DashboardNavMain>
            
            <DashboardNavFooter>
              <Separator className="my-2" />
               <DashboardNavLink href="/dashboard/settings">
                <span><Settings className="h-4 w-4" />Settings</span>
              </DashboardNavLink>
              <UserNav />
            </DashboardNavFooter>
          </DashboardNav>
          <DashboardMain>{children}</DashboardMain>
        </DashboardLayout>
      </PageTransitionWrapper>
    </div>
  );
}
