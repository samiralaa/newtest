/* eslint-disable react/prop-types */
import styles from "../../styles/_LinksList.module.scss";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
const LinkList = ({ setHandler }) => {
  const { t, i18n } = useTranslation("global");
  const navLinks = [
    {
      url: "/",
      title: t("navBar.home"),
      label: "Home Page",
    },
    {
      url: "/AboutUs",
      title: t("navBar.about"),
      label: "AboutUs Page",
    },
    {
      url: "/all/project",
      title: t("navBar.projects"),
      label: "Projects Page",
    },
    {
      url: "/Careers",
      title: t("navBar.careers"),
      label: "Careers Page",
    },
  ];
  const changeLanguage = () => {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en");
      Cookies.set("lang", "en");
    } else {
      i18n.changeLanguage("ar");
      Cookies.set("lang", "ar");
    }
  };
  const closeNavBar = () => {
    setHandler(false);
  };
  return (
    <div className={styles.wrapper}>
      <ul
        className={`${styles.links} ${i18n.language === "ar" ? styles.ar : ""}`}
      >
        {navLinks.map((link) => {
          return (
            <li key={link.label}>
              <NavLink
                to={link.url}
                className={({ isActive }) => (isActive ? styles.active : "")}
                aria-label={link.label}
                onClick={closeNavBar}
              >
                {link.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <Link
        to="/ContactUs"
        className={`${styles.contactBtn} ${
          i18n.language === "ar" ? styles.ar : ""
        }`}
        onClick={closeNavBar}
      >
        {t("navBar.contactUs")}
      </Link>
      <button
        onClick={changeLanguage}
        className={`${styles.languagButton} ${
          i18n.language === "ar" ? styles.ar : ""
        }`}
      >
        {i18n.language === "en" ? "ar" : "en"}
      </button>
    </div>
  );
};
export default LinkList;
