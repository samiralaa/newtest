import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AnimatedContainer from '../components/UI/AnimatedContainer';
import Container from '../components/UI/Container';
import PageHeader from '../components/UI/PageHeader';
import CategoryHeader from '../components/UI/CategoryHeader';
import styles from '../styles/_CategoryItems.module.scss';

const CategoryItems = () => {
  const { t, i18n } = useTranslation('global');
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [index, setIndex] = useState(0);

  const loadHandler = () => {
    setIndex(prevIndex => prevIndex + 8);
  };

  const fetchData = async () => {
    try {
      
      const response = await axios.get(
        'https://backend.lixir-interiors.com/api/categoryproduct/show/15'
      );
      console.log('Category Data:', response.data.category);
      setData(response.data.category);
    } catch (error) {
      console.error('Error fetching category data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data && data.caregryproductprojects.length > 8) {
      const items = data.caregryproductprojects.slice(index, index + 8);
      setFilteredData(prevData => [...prevData, ...items]);
    }
  }, [data, index]);

  return (
    <AnimatedContainer>
      <div className={styles.categoryItems}>
        <div className={styles.head}>
          <div className={styles.contents}>
            <div className={styles.wrapper}>
              <PageHeader>{t('navBar.projects')}</PageHeader>
              <div className={styles.items}>
                <div className={styles.projectHead}>
                  <img
                    src={data && data.media[0].original_url}
                    alt="category-head-img"
                    loading="lazy"
                  />
                  <CategoryHeader>
                    {i18n.language === 'ar' ? data?.title?.ar : data?.title?.en}
                  </CategoryHeader>
                </div>
                <Container subClass="sm">
                  {data && data.caregryproductprojects.length > 0 && (
                    <div className={styles.categories}>
                      {(data.caregryproductprojects.length > 8
                        ? filteredData
                        : data.caregryproductprojects
                      ).map((item, index) => (
                        <Link
                          key={index}
                          className={styles.category}
                          to={`/AllProjects`}
                        >
                          <div className={styles.img}>
                            <img
                              src={item.media[0]?.original_url}
                              alt={`${data.name}-${index}-img`}
                              loading="lazy"
                            />
                          </div>
                          <span
                            className={`${styles.title} ${
                              i18n.language === 'ar' ? styles.ar : ''
                            }`}
                          >
                            {i18n.language === 'ar' ? item.title?.ar : item.title?.en}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {data && data.caregryproductprojects.length > 8 && (
                    <button
                      className={`${styles.loadMore} ${
                        i18n.language === 'ar' ? styles.ar : ''
                      }`}
                      onClick={loadHandler}
                    >
                      {t('loadMore')}
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
