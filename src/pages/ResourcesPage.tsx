import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ResourcesPage() {
  const { t } = useTranslation();
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div>{t("pages.resources")}</div>
    </ScrollArea>
  );
}
