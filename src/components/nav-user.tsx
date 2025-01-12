import { useEffect } from "react";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Languages,
  LogIn,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-provider";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { usePremium } from "@/hooks/usePremium";

export function NavUser() {
  const { open } = useSidebar();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, refreshUser, isLoading } = useUser();
  const { isPremium } = usePremium();

  useEffect(() => {
    console.log("NavUser mounted, current user state:", user);
    if (!user && !isLoading) {
      console.log("No user found, attempting to refresh");
      refreshUser();
    }
  }, [user, refreshUser, isLoading]);

  // Language change function
  const changeLanguage = (lng: string) => {
    i18n
      .changeLanguage(lng)
      .then(() => {
        console.log("Language changed to:", lng);
      })
      .catch((err) => {
        console.error("Failed to change language:", err);
      });
  };

  // Get available languages
  const languages = Object.keys(i18n.options.resources || {}).map((lang) => ({
    code: lang,
    name: i18n.getResource(lang, "translation", "language.name"),
  }));

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={cn(
          "flex items-center gap-2",
          !open ? "flex-col" : "flex-row justify-between",
        )}
      >
        {!user ? (
          <Button className="w-full p-3" onClick={() => navigate("/auth")}>
            <LogIn />
            {open && <p>{t("sidebar.loginingButton")}</p>}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar || undefined}
                    alt={user.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {open && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{user.login}</span>
                  </div>
                )}
                {open && <ChevronsUpDown className="ml-auto size-4" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={!open ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar || undefined}
                      alt={user.username}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.username}
                    </span>
                    <span className="truncate text-xs">{user.login}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!isPremium() && (
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/premium")}>
                    <Sparkles className="mr-2" />
                    {t("userMenu.upgradeToPro")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
              )}
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <BadgeCheck className="mr-2" />
                  {t("userMenu.account")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/billing")}>
                  <CreditCard className="mr-2" />
                  {t("userMenu.billing")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/notifications")}>
                  <Bell className="mr-2" />
                  {t("userMenu.notifications")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2" />
                  {t("userMenu.settings")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Languages className="mr-2" />
                    {t("userMenu.language")}
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{t("userMenu.language")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2" />
                {t("userMenu.logOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ThemeSwitcher />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
