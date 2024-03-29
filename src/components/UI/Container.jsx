/* eslint-disable react/prop-types */
import styles from "../../styles/_Container.module.scss";
const Container = ({ subClass, children }) => {
  return (
    <div className={`${styles.container} ${subClass ? subClass : ""}`}>
      {children}
    </div>
  );
};
export default Container;
