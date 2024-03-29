import styles from "../../styles/_PageHeader.module.scss";
import { useTranslation } from "react-i18next";
/* eslint-disable react/prop-types */
const PageHeader = ({ children }) => {
  const { i18n } = useTranslation("global");
  return (
    <h1 className={`${styles.head} ${i18n.language === "ar" ? styles.ar : ""}`}>
      {children}
    </h1>
  );
};
export default PageHeader;
