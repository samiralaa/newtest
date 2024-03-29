import styles from "../../styles/_NavBar.module.scss";
import { Link } from "react-router-dom";
import Container from "../UI/Container";
import LinkList from "./LinksList";
import { useEffect, useState, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
const NavBar = () => {
  const { i18n } = useTranslation("global");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTogglerOpened, setIsTogglerOpened] = useState(false);
  const collapseRef = useRef();
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const threshold = 1;
    setIsScrolled(scrollTop > threshold);
  };
  const onClickTogglerHandler = () => {
    setIsTogglerOpened((prevToggler) => {
      return !prevToggler;
    });
  };
  const closeHandler = () => {
    setIsTogglerOpened(false);
  };
  const handleClickOutside = (e) => {
    if (collapseRef.current && !collapseRef.current.contains(e.target)) {
      setIsTogglerOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scroll : ""}`}>
      <Container subClass="xl">
        <nav className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            <img src={"/AppLogo.png"} alt="logo-picture" style={{width:'250px'}}/>
          </Link>
          <div
            className={
              isTogglerOpened
                ? `${styles.toggler} ${styles.open}`
                : styles.toggler
            }
            onClick={onClickTogglerHandler}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className={`${styles.overlay} ${
              isTogglerOpened ? styles.show : ""
            }`}
          />
          <div
            className={`${styles.collapse} ${
              isTogglerOpened ? styles.opened : ""
            } ${i18n.language === "ar" ? styles.ar : ""}`}
            ref={collapseRef}
          >
            <button className={styles.close} onClick={closeHandler}>
              <IoIosClose />
            </button>
            <LinkList setHandler={setIsTogglerOpened} />
          </div>
        </nav>
      </Container>
    </header>
  );
};
export default NavBar;
