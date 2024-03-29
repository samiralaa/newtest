/* eslint-disable react/prop-types */
import styles from "../../styles/_LatestProjects.module.scss";
import Container from "../UI/Container";
import SectionHeader from "../UI/SectionHeader";
import { useTranslation } from "react-i18next";
const LatestProjects = ({ projects }) => {
  const { t, i18n } = useTranslation("global");
  return (
    <div className={styles.latestProjects}>
      <Container>
        <SectionHeader subClass={styles.sectionTitle}>
          {t("latestProjects")}
        </SectionHeader>
        <ul className={styles.projectsList}>
          {projects.map((item, index) => {
            return (
              <li key={index}>
                <div className={styles.img}>
                  <img
                    src={item.media[0] && item.media[0].original_url}
                    alt={`project${index}-picture`}
                    loading="lazy"
                  />
                </div>
                <span
                  className={`${styles.title} ${
                    i18n.language === "ar" ? styles.ar : ""
                  }`}
                >
                  {i18n.language === "en" ? item.title.en : item.title.ar}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
export default LatestProjects;
