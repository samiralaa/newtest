/* eslint-disable react/prop-types */
import styles from "../../styles/_Clients.module.scss";
import SectionHeader from "../UI/SectionHeader";
import Container from "../UI/Container";
import { useTranslation } from "react-i18next";
const Clients = ({ clients }) => {
  const { t, i18n } = useTranslation("global");
  return (
    <div className={styles.clients}>
      <div className={styles.header}>
        <div className={styles.vectorWrapper}>
          <div className={styles.vector}>
            <img src={"/vector.svg"} alt="vector-picture" loading="lazy" />
          </div>
        </div>
        <Container>
          <div className={styles.contents}>
            <SectionHeader subClass={styles.sectionHeader}>
              {t("clients.title")}
            </SectionHeader>
            <div className={styles.imgWrapper}>
              <img
                src={"/Group.png"}
                alt="vector-picture"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </div>
      <Container subClass="sm">
        <div className={styles.body}>
          <ul className={styles.clientsWrapper}>
            {clients.map((client, index) => {
              return (
                <li key={index} className={styles.clientContainer}>
                  <div
                    className={`${styles.clientHead} ${
                      i18n.language === "ar" ? styles.ar : ""
                    }`}
                  >
                    <span>{t(client.title)}</span>
                    <span className={styles.line} />
                  </div>
                  <ul className={styles.clientsList}>
                    {client.clients.map((item, index) => {
                      return (
                        <li key={index} className={styles.client}>
                          <img src={item} alt="client-picture" loading="lazy" />
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
};
export default Clients;
