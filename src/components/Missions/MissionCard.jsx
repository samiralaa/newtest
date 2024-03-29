/* eslint-disable react/prop-types */
import styles from "../../styles/_MissionCard.module.scss";
import { useTranslation } from "react-i18next";
const MissionCard = ({ data, index }) => {
  const { t, i18n } = useTranslation("global");
  return (
    <div className={styles.missionCard}>
      <div className={styles.icon}>
        <img src={data.icon} alt={`mission-${index}-picture`} loading="lazy" />
      </div>
      <h3
        className={`${styles.title} ${i18n.language === "ar" ? styles.ar : ""}`}
      >
        {t(data.name)}:
      </h3>
      <p
        className={`${styles.description} ${
          i18n.language === "ar" ? styles.ar : ""
        }`}
      >
        {t(data.description)}
      </p>
    </div>
  );
};
export default MissionCard;
