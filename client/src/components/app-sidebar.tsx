import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, Briefcase, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";

export function AppSidebar() {
  const { user, isAuthenticated } = useAuth();

  const userInitials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-6">
        <div className="space-y-2">
          <h2 className="font-poppins font-bold text-xl text-foreground" data-testid="text-sidebar-title">
            ServiceKart
          </h2>
          <p className="text-xs text-muted-foreground">
            {isAuthenticated 
              ? user?.role === "seller" 
                ? "Seller Dashboard" 
                : "Find Services"
              : "Trusted Services"}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {isAuthenticated ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild data-testid="sidebar-link-home">
                      <Link href="/">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {user?.role === "buyer" && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild data-testid="sidebar-link-become-seller">
                        <Link href="/register-seller">
                          <Briefcase className="w-4 h-4" />
                          <span>Become a Seller</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="gap-3" data-testid="sidebar-button-profile">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={user?.profileImageUrl || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm font-medium">{user?.firstName || "User"}</span>
                        {user?.role && (
                          <Badge variant="secondary" className="text-xs capitalize px-1.5 py-0">
                            {user.role}
                          </Badge>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => window.location.href = '/api/logout'}
                      className="text-destructive hover:text-destructive"
                      data-testid="sidebar-link-logout"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel>Get Started</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => window.location.href = '/api/login'}
                    data-testid="sidebar-link-login"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => window.location.href = '/api/login'}
                    data-testid="sidebar-link-register-buyer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register as Buyer</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild data-testid="sidebar-link-register-seller">
                    <Link href="/register-seller">
                      <Briefcase className="w-4 h-4" />
                      <span>Register as Seller</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          &copy; 2025 ServiceKart
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
