import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Languages,
  LogIn,
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

import { useAuth } from "@/hooks/useAuth";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { open } = useSidebar();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Функция для смены языка
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

  // Получаем список всех доступных языков
  const languages = Object.keys(i18n.options.resources || {}).map((lang) => ({
    code: lang,
    name: i18n.getResource(lang, "translation", "language.name"),
  }));

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <SidebarMenu>
        <SidebarMenuItem
          className={cn(
            "flex items-center gap-2",
            !open ? "flex-col" : "flex-row",
          )}
        >
          <Button className="p-3 w-full" onClick={() => navigate("/auth")}>
            <LogIn />
            {open && <p>{t("sidebar.loginingButton")}</p>}
          </Button>
          <ThemeSwitcher />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem
        className={cn(
          "flex items-center gap-2",
          !open ? "flex-col" : "flex-row",
        )}
      >
        {/* Кнопка пользователя */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              {open && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              )}
              {open && <ChevronsUpDown className="ml-auto size-4" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Меню пользователя */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={!open ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                {t("userMenu.upgradeToPro")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                {t("userMenu.account")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                {t("userMenu.billing")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                {t("userMenu.notifications")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Вкладка для переключения языка */}
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Languages />
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
            <DropdownMenuItem>
              <LogOut />
              {t("userMenu.logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
          {open && <ThemeSwitcher />}
        </DropdownMenu>
        {!open && <ThemeSwitcher />}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
