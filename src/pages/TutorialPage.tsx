import { useTranslation } from "react-i18next";

export function TutorialPage() {
  const { t } = useTranslation();
  return <div>{t("pages.tutorial")}</div>;
}
