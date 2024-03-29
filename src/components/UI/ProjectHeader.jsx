/* eslint-disable react/prop-types */
import styles from "../../styles/_ProjectHeader.module.scss";
import { useTranslation } from "react-i18next";
const ProjectHeader = ({ children }) => {
  const { i18n } = useTranslation("global");
  return (
    <h4
      className={`${styles.header} ${i18n.language === "ar" ? styles.ar : ""}`}
    >
      {children}
    </h4>
  );
};
export default ProjectHeader;
