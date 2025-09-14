

"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu as BaseSidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarGroup as BaseSidebarGroup,
  SidebarGroupLabel as BaseSidebarGroupLabel
} from "@/components/ui/sidebar";
import { SheetHeader as RadixSheetHeader, SheetTitle } from "@/components/ui/sheet";


export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {children}
      </div>
    </SidebarProvider>
  );
}

export function DashboardNav({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/80"
      mobileHeader={
        <RadixSheetHeader>
            <SheetTitle>Navigation</SheetTitle>
        </RadixSheetHeader>
      }
    >
      <div className={cn("flex flex-col h-full w-full", isMobile && "p-2")}>
        {children}
      </div>
    </Sidebar>
  );
}

export function DashboardNavHeader({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  return (
    <SidebarHeader className={cn("p-2", state === "collapsed" && "items-center")}>
      {children}
    </SidebarHeader>
  );
}

export function DashboardNavHeaderTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useSidebar();
  return (
    <h1
      className={cn(
        "text-2xl font-bold text-primary",
        state === "collapsed" && "hidden"
      )}
    >
      {children}
    </h1>
  );
}

export function DashboardNavContent({ children }: { children: React.ReactNode }) {
  return <SidebarContent>{children}</SidebarContent>;
}

export function DashboardNavMain({ children }: { children: React.ReactNode }) {
  return (
    <SidebarContent className="p-0">
      {children}
    </SidebarContent>
  );
}

export function DashboardNavFooter({ children }: { children: React.ReactNode }) {
  return <SidebarFooter>{children}</SidebarFooter>;
}

export function DashboardNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = active || pathname === href;

  return (
    <SidebarMenuItem>
      <Link href={href}>
        <SidebarMenuButton isActive={isActive}>{children}</SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export function SidebarMenu({ children, className }: { children: React.ReactNode, className?: string }) {
    return <BaseSidebarMenu className={cn("px-2", className)}>{children}</BaseSidebarMenu>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode, className?: string }) {
    return <BaseSidebarGroup className={cn(className)}>{children}</BaseSidebarGroup>
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode, className?: string }) {
    return <BaseSidebarGroupLabel className={cn("uppercase text-xs text-muted-foreground/80 tracking-wider px-2", className)}>{children}</BaseSidebarGroupLabel>
}

export function DashboardMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 md:p-8 flex-1 overflow-y-auto bg-secondary/10">
      {children}
    </main>
  );
}

export function DashboardHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between mb-8">
      {children}
    </header>
  );
}

export function DashboardHeaderTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className="text-3xl font-bold">{children}</h2>;
}

export function DashboardHeaderNav({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
