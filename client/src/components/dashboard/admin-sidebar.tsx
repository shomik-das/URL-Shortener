'use client';

import { memo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  Home,
  Inbox,
  Link2,
  User as UserIcon,
  LogOutIcon,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const menuItems = [
  { title: 'Add link', icon: Home, href: "/dashboard/add-link" },
  { title: 'Your Links', icon: Link2, href: '/dashboard/your-links' },
];

export function SidebarHeaderSkeleton() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="flex items-center gap-3 p-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export const AdminSidebar = memo(() => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Sidebar collapsible="icon">
      {loading ? (
        <SidebarHeaderSkeleton />
      ) : (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="rounded-md overflow-hidden">
                  <AvatarImage
                    src={user?.image}
                    alt="Profile image"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {user?.firstName?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-sm">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? 'bg-primary/90 text-primary-foreground hover:bg-primary/90'
                          : ''
                      }
                    >
                      <Link prefetch={false} href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOutIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
});

AdminSidebar.displayName = 'AdminSidebar';
