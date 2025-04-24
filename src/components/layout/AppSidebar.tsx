
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, FolderPlus, LogOut, Plus, User } from 'lucide-react';

const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem active={isActive('/dashboard')}>
                <SidebarMenuButton asChild>
                  <Button
                    variant={isActive('/dashboard') ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate('/new-project')}
                  >
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
