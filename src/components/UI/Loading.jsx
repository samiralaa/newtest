import styles from "../../styles/_Loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
    </div>
  );
};
export default Loading;
