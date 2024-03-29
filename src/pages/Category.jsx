import { useState, useEffect } from "react";
import styles from "../styles/_UpdateData.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
const Category = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to track active image index
  const data = useLoaderData();
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move to the next slide every 5 seconds
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.product.media.length);
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [data.product.media.length]);

  const handleSlideChange = (index) => {
    setActiveIndex(index); // Update activeIndex when the slide changes
  };

  if (!data || !data.product) {
    console.error("No product data found:", data);
    return <p>No product found</p>;
  }

  const { product } = data;

  return (
    <AnimatedContainer>
      <div className={styles.productContainer}>
        <div className={styles.categories}>
          <div className={styles.product}>
            <Swiper
               modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
               spaceBetween={50}
               slidesPerView={1}
               navigation
               scrollbar={{ draggable: true }}
              effect="fade"
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
              loop={true}
              initialSlide={activeIndex} // Set the initial slide
            >
              {product.media.map((mediaItem, index) => (
                <SwiperSlide key={index} className={styles.productItem}>
                  <img
                    className={styles.image}
                    src={mediaItem.original_url}
                    alt={`product-img-${index}`}
                    loading="lazy"
                    style={{ width: "800px", height: "340px" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.details}>
              <h2 className={styles.title}>
                {i18n.language === "ar" ? product.title.ar : product.title.en}
              </h2>
              <h3 className={styles.description}>{t("description")}</h3>
              <p className={styles.description}>
                {i18n.language === "ar"
                  ? product.description.ar
                  : product.description.en}
              </p>

              <div className={styles.info}>
                <div>
                  <h3>{t("currency")}</h3>
                  <p>{product.price}</p>
                </div>
                <div>
                  <h3>{t("Girth")}</h3>
                  <p>{product.scope}</p>
                </div>
                <div>
                  <h3>{t("refcode")}</h3>
                  <p>{product.refcode}</p>
                </div>
              </div>
              <button className={styles.buyNowButton}>{t("buyNow")}</button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Category;

export async function loader({ params }) {
  const categoryId = params.category;
  try {
    const response = await axios.get(
      `https://backend.lixir-interiors.com/api/products/${categoryId}`
    );
    const data = response.data;
    if (!data || !data.product) {
      console.error("Invalid API response:", data);
      return { product: null };
    }
    return { product: data.product };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { product: null };
  }
}
