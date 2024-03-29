/* eslint-disable react/prop-types */
import styles from "../../styles/_CategoryHeader.module.scss";
import { useTranslation } from "react-i18next";
const CategoryHeader = ({ children }) => {
  const {  i18n } = useTranslation("global");
  return (
    <h2
      className={`${styles.header} ${i18n.language === "ar" ? styles.ar : ""}`}
    >
      {children}
    </h2>
  );
};
export default CategoryHeader;
