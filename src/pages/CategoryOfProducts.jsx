import styles from "../styles/_Category.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/UI/PageHeader";
import Container from "../components/UI/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const Category = () => {
  const data = useLoaderData();
  const { i18n } = useTranslation("global");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedContainer>
      <div className={styles.category}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <Container subClass="sm">
              <div className={styles.wrapper}>
                <PageHeader>
                  {i18n.language === "ar" ? data.title.ar : data.title.en}
                </PageHeader>
                <div className={styles.categories}>
                  {data.categorys.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className={styles.category}
                        to={`/Projects/${data.id}/${item.id}`}
                      >
                        <img
                          src={item.media[0].original_url}
                          alt={`category-${index}-img`}
                          loading="lazy"
                        />
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
              </div>
            </Container>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Category;

export async function loader() {
  let returnValue = [];

  try {
    const response = await axios.get(
      'https://backend.lixir-interiors.com/api/categoryproduct/index'
    );
    console.log('Response:', response); // Log the entire response for debugging
    const data = await response.data;
    returnValue = data.categories || []; // Use a fallback value if categories array is not present
  } catch (error) {
    console.error('Error fetching data:', error.message);
    console.error('Error details:', error); // Log the error details for debugging
    throw error; // Rethrow the error for handling at the caller's end
  }

  return returnValue;
}