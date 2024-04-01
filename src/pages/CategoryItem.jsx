import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AnimatedContainer from '../components/UI/AnimatedContainer';
import PageHeader from '../components/UI/PageHeader';
import CategoryHeader from '../components/UI/CategoryHeader';
import Container from '../components/UI/Container';
import VideoPlayer from '../components/UI/VideoPlayer';
import ProjectHeader from '../components/UI/ProjectHeader';
import styles from '../styles/_CategoryItem.module.scss';

const CategoryItem = () => {
  const { t, i18n } = useTranslation('global');
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://backend.lixir-interiors.com/api/categoryproductproject/show/1'
        );
        setProjectData(response.data.project);
      } catch (error) {
        console.error('Error fetching project data:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!projectData) {
    return <p>Loading...</p>; // Show loading state while data is being fetched
  }

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
                    src={projectData.media[0]?.original_url}
                    alt="category-head-img"
                    loading="lazy"
                  />
                  <CategoryHeader>{t('categoryItem.projectRef')}</CategoryHeader>
                </div>
                <Container subClass="sm">
                  <div className={styles.details}>
                    <VideoPlayer
                      videoId={projectData.link}
                      thumbnail={projectData.media[0]?.original_url}
                    />
                    <div className={styles.address}>
                      <div
                        className={`${styles.addressText} ${styles.location} ${
                          i18n.language === 'ar' ? styles.ar : ''
                        }`}
                      >
                        <ProjectHeader>{t('categoryItem.location')}</ProjectHeader>
                        <p className={styles.text}>
                          {i18n.language === 'ar' ? projectData.location?.ar : projectData.location?.en}
                        </p>
                      </div>
                      <div
                        className={`${styles.addressText} ${styles.scope} ${
                          i18n.language === 'ar' ? styles.ar : ''
                        }`}
                      >
                        <ProjectHeader>{t('categoryItem.scope')}</ProjectHeader>
                        <p className={styles.text}>
                          {i18n.language === 'ar' ? projectData.scope?.ar : projectData.scope?.en}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles.addressText} ${styles.description} ${
                        i18n.language === 'ar' ? styles.ar : ''
                      }`}
                    >
                      <ProjectHeader>{t('categoryItem.description')}</ProjectHeader>
                      <p className={styles.text}>
                        {i18n.language === 'ar' ? projectData.description?.ar : projectData.description?.en}
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
