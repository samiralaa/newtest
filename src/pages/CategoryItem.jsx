import styles from "../styles/_CategoryItem.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import PageHeader from "../components/UI/PageHeader";
import CategoryHeader from "../components/UI/CategoryHeader";
import Container from "../components/UI/Container";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../components/UI/VideoPlayer";
import ProjectHeader from "../components/UI/ProjectHeader";
import { useEffect } from "react";
const CategoryItem = () => {
  const data = useLoaderData();
  const { t, i18n } = useTranslation("global");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatedContainer>
      <div className={styles.categoryItems}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <div className={styles.wrapper}>
              <PageHeader>{t("navBar.projects")}</PageHeader>
              <div className={styles.items}>
                <div className={styles.projectHead}>
                  <img
                    src={data.media[0].original_url}
                    alt="category-head-img"
                    loading="lazy"
                  />
                  <CategoryHeader>
                    {t("categoryItem.projectRef")}
                  </CategoryHeader>
                </div>
                <Container subClass="sm">
                  <div className={styles.details}>
                    <VideoPlayer
                      videoId={data.link}
                      thumbnail={data.media[0].original_url}
                    />
                    <div className={styles.address}>
                      <div
                        className={`${styles.addressText} ${styles.location} ${
                          i18n.language === "ar" ? styles.ar : ""
                        }`}
                      >
                        <ProjectHeader>
                          {t("categoryItem.location")}
                        </ProjectHeader>
                        <p className={styles.text}>
                          {i18n.language === "ar"
                            ? data.location.ar
                            : data.location.en}
                        </p>
                      </div>
                      <div
                        className={`${styles.addressText} ${styles.scope} ${
                          i18n.language === "ar" ? styles.ar : ""
                        }`}
                      >
                        <ProjectHeader>{t("categoryItem.scope")}</ProjectHeader>
                        <p className={styles.text}>
                          {i18n.language === "ar"
                            ? data.scope.ar
                            : data.scope.en}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles.addressText} ${styles.description} ${
                        i18n.language === "ar" ? styles.ar : ""
                      }`}
                    >
                      <ProjectHeader>
                        {t("categoryItem.description")}
                      </ProjectHeader>
                      <p className={styles.text}>
                        {i18n.language === "ar"
                          ? data.description.ar
                          : data.description.en}
                      </p>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
export default CategoryItem;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const itemId = params.itemId;
  let returnValue = "";
  try {
    const response = await axios.get(
      `https://backend.lixir-interiors.com/api/project/show/${itemId}`
    );
    const data = await response.data;
    returnValue = data.project;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
