/* eslint-disable react/prop-types */
import styles from "../../styles/_SectionHeader.module.scss";
import { useTranslation } from "react-i18next";
const SectionHeader = ({ subClass, children }) => {
  const { i18n } = useTranslation("global");
  return (
    <h1
      className={`${styles.head} ${subClass ? subClass : ""} ${
        i18n.language === "ar" ? styles.ar : ""
      }`}
    >
      {children}
    </h1>
  );
};
export default SectionHeader;
