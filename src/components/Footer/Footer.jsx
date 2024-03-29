import styles from "../../styles/_Footer.module.scss";
import Container from "../UI/Container";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { contactMethods } from "../../lib/contactInfo";
const Footer = () => {
  const { t, i18n } = useTranslation("global");
   
  const socialLinks = [
    { icon: "/facebookIcon.png", url: "https://www.facebook.com/Lixirinteriors" },
    { icon: "/instagramIcon.png", url: "" },
    { icon: "/tiktok.png", url: "" },
    { icon: "/youtubeIcon.png", url: "https://www.youtube.com/@LixirInteriors" },
    
  ];
  return (
    <footer className={styles.footer}>
      <Container subClass="sm">
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.logo}>
              <div className={styles.logoWrapper}>
                <img src="/Asset2.png" alt="footer-logo-1" />
              </div>
              {/* <div className={styles.logoText}>
                <img src="/footerLogo.svg" alt="footer-logo-2" />
              </div> */}
            </div>
            <div className={styles.contact}>
              <p
                className={`${styles.text} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("footer.readyToGetStarted")}
              </p>
              <Link
                to="/ContactUs"
                className={`${styles.btn} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("footer.getStarted")}
              </Link>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.location}>
              <p
                className={`${styles.locationTitle} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("footer.ourLocation")}
              </p>
              <div className={styles.map}>
                <Link to="https://maps.app.goo.gl/6MFCVyt55NKPXvs97">
                  <img src="/location.png" alt="location-img" />
                </Link>
              </div>
            </div>
            
            <div className={styles.contacts}>
              <div style={{ marginBottom: '30px' }}>
              <p style={{ marginBottom: '30px' }}
                className={`${styles.contactTitle} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("navBar.contactUs")}
              </p>
              <ul className={styles.contactMethods}>
                {contactMethods.map((item, index) => {
                  return (
                    <li key={index} className={styles.method}>
                      <span className={styles.icon}>{item.icon}</span>
                      <span
                        className={`${styles.value}  ${
                          i18n.language === "ar" ? styles.ar : ""
                        }`}
                      >
                        {i18n.language === "ar" ? item.value.ar : item.value.en}
                      </span>
                    </li>
                  );
                })}
              </ul>
              </div>
              <div>
              <p style={{ marginBottom: '30px' }}
                className={`${styles.contactTitle} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("navBar.Social")}
              </p>
              <div className={styles.social}>
                {socialLinks.map((item, index) => {
                  return (
                    <Link key={index} to={item.url} className={styles.link}>
                      <img src={item.icon} alt={`social-${index}-icon`} />
                    </Link>
                  );
                })}
              </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
