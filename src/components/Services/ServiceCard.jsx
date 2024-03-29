/* eslint-disable react/prop-types */
import styles from "../../styles/_ServiceCard.module.scss";
import { useTranslation } from "react-i18next";
const ServiceCard = ({ item, subClass }) => {
  const { i18n } = useTranslation("global");
  return (
    
    <div className={`${styles.card} ${subClass}`}>
       <h2
          className={`${styles.title} ${
            i18n.language === "ar" ? styles.ar : ""
          }`}
        >
          {i18n.language === "en" ? item.title.en : item.title.ar}
        </h2>
      <div className={styles.icon}>
        
        <img
          src={item.media[0].original_url}
          alt="group-picture"
          loading="lazy"
        />
      </div>
      <div className={styles.details}>
       
       
      </div>
    </div>
  );
};
export default ServiceCard;
