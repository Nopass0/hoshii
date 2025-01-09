import { useTranslation } from "react-i18next";

export const usePageTranslation = () => {
  const { t } = useTranslation();

  const translatePageTitle = (key: string) => {
    return t(`pages.${key}`);
  };

  return { translatePageTitle };
};
