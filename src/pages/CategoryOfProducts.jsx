import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "../styles/__StyleCategiry.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer"
import Container from '../components/UI/Container';
import PageHeader from '../components/UI/PageHeader';

const Category = () => {
  const { t } = useTranslation('global');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        'https://backend.lixir-interiors.com/api/categoryproduct/index'
      );
      console.log('Category Data:', response.data.categories);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching category data:', error.message);
    }
  };

  return (
    <AnimatedContainer>
      <div className={styles.category}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <Container subClass="sm">
              <div className={styles.wrapper}>
                <PageHeader>{t('title_key_here')}</PageHeader>
                <div className={styles.categories}>
                  {categories.map((item, index) => (
                    <Link
                      key={index}
                      className={styles.category}
                      to={`/Projects/${item.id}`}
                    >
                      <img
                        src={item.media[0].original_url}
                        alt={`category-${index}-img`}
                        loading="lazy"
                      />
                      <span
                        className={`${styles.title} ${
                          item.title.ar ? styles.ar : ''
                        }`}
                      >
                        {item.title.ar ? item.title.ar : item.title.en}
                      </span>
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

export default Category;
