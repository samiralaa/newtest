/* eslint-disable react/prop-types */
import styles from "../styles/_RootLayout.module.scss";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import FixedCenterComponent from '../components/Footer/IconeContact'
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div className={styles.root}>
      <NavBar />
      <Outlet />
      <FixedCenterComponent/>
      <Footer />
    </div>
  );
};
export default RootLayout;
