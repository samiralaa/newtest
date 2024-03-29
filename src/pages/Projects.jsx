import styles from "../styles/_Projects.module.scss";
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
                <div className={styles.categories}  style={{ display: "flex", flexWrap: "wrap" }} >
                  {data.map((item, index) => (
                    <Link
                      key={index}
                      className={styles.card}
                      to={`/Projects/${item.id}`} // Assuming you have a route set up for individual projects
                    >
                      <img
                        src={item.media[0].original_url}
                        alt={`project-${index}-img`}
                        loading="lazy"
                      />
                      <div className={styles.details}>
                        <p
                          className={`${styles.title} ${i18n.language === "ar" ? styles.ar : ""
                            }`}
                        >
                          
                          {i18n.language === "ar" ? item.title.ar : item.title.en}
                        </p>
                        <p className={styles.price}>
                          {t("currency")} : {item.price}
                        </p>
                        <button>Show More</button>
                      </div>
                    </Link>

                  ))}
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
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let returnValue = "";
  try {
    const response = await axios.get(
      "https://backend.lixir-interiors.com/api/products"
    );
    const data = await response.data;
    console.log(data);
    returnValue = data.product;
    console.log(returnValue);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
