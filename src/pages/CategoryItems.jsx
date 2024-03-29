/* eslint-disable react-refresh/only-export-components */
import styles from "../styles/_CategoryItems.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import Container from "../components/UI/Container";
import PageHeader from "../components/UI/PageHeader";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CategoryHeader from "../components/UI/CategoryHeader";
import { useEffect, useState } from "react";
const CategoryItems = () => {
  const data = useLoaderData();
  const { t, i18n } = useTranslation("global");
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const loadHandler = () => {
    setIndex((prevIndex) => {
      return prevIndex + 8;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (data.projects.length > 8) {
      const items = data.projects.slice(index, index + 8);
      setFilteredData((prevData) => {
        return [...prevData, ...items];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
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
                    {i18n.language === "ar" ? data.title.ar : data.title.en}
                  </CategoryHeader>
                </div>
                <Container subClass="sm">
                  {data && data.projects.length > 0 && (
                    <div className={styles.categories}>
                      {(data.projects.length > 8
                        ? filteredData
                        : data.projects
                      ).map((item, index) => {
                        return (
                          <Link
                            key={index}
                            className={styles.category}
                            to={`/Projects/${data.parent_id}/${data.id}/${item.id}`}
                          >
                            <div className={styles.img}>
                              <img
                                src={
                                  item.media[0] && item.media[0].original_url
                                }
                                alt={`${data.name}-${index}-img`}
                                loading="lazy"
                              />
                            </div>
                            <span
                              className={`${styles.title} ${
                                i18n.language === "ar" ? styles.ar : ""
                              }`}
                            >
                              {i18n.language === "ar"
                                ? item.title.ar
                                : item.title.en}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  {data.projects.length > 8 && (
                    <button
                      className={`${styles.loadMore} ${
                        i18n.language === "ar" ? styles.ar : ""
                      }`}
                      onClick={loadHandler}
                    >
                      {t("loadMore")}
                    </button>
                  )}
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};
export default CategoryItems;
export async function loader({ params }) {
  const category = params.categoryName;
  let returnValue = "";
  try {
    const response = await axios.get(
      `https://backend.lixir-interiors.com/api/category/show/${category}`
    );
    const data = await response.data;
    returnValue = data.category;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
