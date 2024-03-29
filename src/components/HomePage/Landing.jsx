import styles from "../../styles/_Landing.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { useTranslation } from "react-i18next";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const Landing = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className={styles.landing}>
      <div className={styles.vector}>
        <img src={"/vector.svg"} alt="vector-picture" loading="lazy" />
      </div>
      <div className={styles.content}>
        <div className={styles.items}>
          <div >
            <img src={"/Asset2.png"} alt="group-picture" loading="lazy" />
          </div>
          <div className={styles.text}>
            <h1
              className={`${styles.welcome} ${
                i18n.language === "ar" ? styles.ar : ""
              }`}
            >
              {t("homePage.welcome")}
            </h1>
            <p
              className={`${styles.history} ${
                i18n.language === "ar" ? styles.ar : ""
              }`}
            >
              {t("homePage.history")}
            </p>
          </div>
        </div>
       
        <Swiper style={{width: "780px"}}
         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
         spaceBetween={50}
         slidesPerView={1}
         navigation
         scrollbar={{ draggable: true }}
         autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        >
            <SwiperSlide>
              <div >
                <img src={"/landing.png"} alt="img"  width= "100%"/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div >
                <img src={"/landing2.jpg"} alt="img"  width= "100%"/>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div >
                <img src={"/landing3.jpg"} alt="img"  width= "100%"/>
              </div>
            </SwiperSlide>
        </Swiper>
        
      </div>
    </div>
  );
};
export default Landing;
