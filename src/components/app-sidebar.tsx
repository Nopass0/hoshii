import * as React from "react";
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  TestTube,
  TestTube2,
  Type,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next"; // Импорт хука для переводов
import { NavSecondary } from "./nav-secondary";
import { useAdmin } from "@/hooks/useAdmin";
import { useUser } from "@/hooks/useUser";

// Это пример данных.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "sidebar.book", // Используем ключ перевода
      url: "#",
      icon: Book,
      items: [
        {
          title: "sidebar.general", // Используем ключ перевода
          url: "#",
          items: [
            {
              title: "sidebar.general", // Используем ключ перевода
              url: "#",
            },
          ],
        },
        {
          title: "sidebar.team", // Используем ключ перевода
          url: "#",
        },
        {
          title: "sidebar.billing", // Используем ключ перевода
          url: "#",
        },
        {
          title: "sidebar.limits", // Используем ключ перевода
          url: "#",
        },
      ],
    },
    {
      title: "sidebar.test", // Используем ключ перевода
      url: "/test",
      icon: TestTube2,
      items: [],
    },
  ],
  resoureces: [
    {
      name: "sidebar.alphabet", // Используем ключ перевода
      url: "/resources/abc",
      //lucide icon
      icon: Type,
    },
  ],
  navSecondary: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { isAdmin } = useAdmin();
  const { isLoading } = useUser();
  const [navSecondary, setNavSecondary] = React.useState(data.navSecondary);

  React.useEffect(() => {
    if (!isLoading && isAdmin()) {
      setNavSecondary((prevNavSecondary) => {
        const adminPanelItem = {
          title: t("sidebar.adminPanel"),
          url: "#",
          icon: Send,
        };

        // Check if the admin panel item already exists
        const adminPanelExists = prevNavSecondary.some(
          (item) => item.title === t("sidebar.adminPanel"),
        );

        if (!adminPanelExists) {
          return [...prevNavSecondary, adminPanelItem];
        }
        return prevNavSecondary;
      });
    }
  }, [isAdmin, isLoading, t]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            title: t(item.title), // Переводим заголовок
            items: item.items.map((subItem) => ({
              ...subItem,
              title: t(subItem.title), // Переводим подзаголовки
            })),
          }))}
        />
        <NavProjects
          projects={data.resoureces.map((resource) => ({
            ...resource,
            name: t(resource.name), // Переводим названия проектов
          }))}
        />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
