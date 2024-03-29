/* eslint-disable react/prop-types */
import styles from "../../styles/_Services.module.scss";
import SectionHeader from "../UI/SectionHeader";
import Container from "../UI/Container";
import ServiceCard from "../Services/ServiceCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
const Services = ({ services }) => {
  const { t,i18n } = useTranslation("global");

  
  return (
    <div className={styles.services}>
      <div className={styles.vectorWrapper}>
        <div className={styles.vector}>
          <img src={"/vector.svg"} alt="vector-picture" loading="lazy" />
        </div>
      </div>
      <Container>
        <SectionHeader>{t("services.ourServices")}</SectionHeader>
        <div className={styles.servicesSwiper}>
          <Swiper
            className={styles.swiper}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              992: {
                slidesPerView: 3,
              },
            }}
            dir={i18n.language==="ar" ? "rtl" : "ltr"}
            key={i18n.language==="ar"}
          >
            {services.map((service, index) => {
              return (
                <SwiperSlide key={index}>
                  <ServiceCard item={service} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};
export default Services;
