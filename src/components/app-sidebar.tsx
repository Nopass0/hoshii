import * as React from "react";
import {
  AudioWaveform,
  Book,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation(); // Используем хук для переводов

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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
