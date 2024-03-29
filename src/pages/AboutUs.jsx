/* eslint-disable react/prop-types */
import styles from "../styles/_AboutUs.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import PageHeader from "../components/UI/PageHeader";
import Container from "../components/UI/Container";
import { useTranslation } from "react-i18next";
import Missions from "../components/HomePage/Missions";
import SectionHeader from "../components/UI/SectionHeader";
import ServiceCard from "../components/Services/ServiceCard";
import axios from "axios";
import { missions } from "../lib/missions";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
const AboutUs = () => {
  const data = useLoaderData();

  const { t, i18n } = useTranslation("global");
  const icons = ["/gestot/Group (1).png", "/gestot/Group (2).png", "/gestot/Clip path group.png"];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatedContainer>
      <div className={styles.about}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <Container subClass="sm">
              <div className={styles.wrapper}>
                <PageHeader>{t("navBar.about")}</PageHeader>
                <div className={styles.details}>
                  <div className={styles.logo}>
                    <img src="/Asset2.png" alt="logo-img" loading="lazy" />
                  </div>
                  <div className={styles.text}>
                    <h2
                      className={`${styles.header} ${
                        i18n.language === "ar" ? styles.ar : ""
                      }`}
                    >
                      {t("aboutPage.history")}:
                    </h2>
                    <p
                      className={`${styles.history} ${
                        i18n.language === "ar" ? styles.ar : ""
                      }`}
                    >
                      {t("homePage.history")}
                    </p>
                    <ul className={styles.icons}>
                      {icons.map((item, index) => {
                        return (
                          <li key={index} className={styles.icon}>
                            <img
                              src={item}
                              alt={`icon-${index}`}
                              loading="lazy"
                              style={{ width: "500px", height: "140px" }} // Set the width to your desired value, such as 100px
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
        <Missions subClass={styles.missionsList} missions={data.missions} />
        <div className={styles.services}>
          <div className={styles.title}>
            <SectionHeader subClass={styles.text}>
              {t("services.ourServices")}
            </SectionHeader>
          </div>
          <div className={styles.servicesWrapper}>
            <Container subClass="sm">
              <ul className={styles.servicesList}>
                {data.services.map((item, index) => {
                  return (
                    <li key={index}>
                      <ServiceCard item={item} subClass={styles.service} />
                    </li>
                  );
                })}
              </ul>
            </Container>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
export default AboutUs;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let returnValue = "";
  try {
    const response = await axios.get(
      "https://backend.lixir-interiors.com/api/serves/index"
    );
    const data = response.data;
    returnValue = {
      services: data.serevs,
  
      missions: missions,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
