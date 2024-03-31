import styles from "../styles/_AllProgects.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import Container from "../components/UI/Container";
import PageHeader from "../components/UI/PageHeader";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const Projects = () => {
  const data = useLoaderData();
  const { t, i18n } = useTranslation("global");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedContainer>
      <div className={styles.projects}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <Container subClass="sm">
              <div className={styles.wrapper}>
                <PageHeader>{t("navBar.projects")}</PageHeader>
                <div className={styles.categories}>

                  
                      <Link
                      
                        className={styles.card}
                        to="/Projects"                    >
                        <img
                          src="/public/partone.png"
                          
                          loading="lazy"
                        />
                        <p
                          className={`${styles.title} ${
                            i18n.language === "ar" ? styles.ar : ""
                          }`}
                        >
                          {i18n.language === "ar"
                            ? "المنتجات"
                            : "Products"}
                        </p>
                      </Link>
                      <Link
                      
                        className={styles.card}
                        to="/product/fre"                    >
                        <img
                          src="/public/partone.png"
                          
                          loading="lazy"
                        />
                        <p
                          className={`${styles.title} ${
                            i18n.language === "ar" ? styles.ar : ""
                          }`}
                        >
                          {i18n.language === "ar"
                            ? "مدونه"
                            : "interior design"}
                        </p>
                      </Link>
                 
                
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Projects;
