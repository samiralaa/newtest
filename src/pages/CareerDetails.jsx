import AnimatedContainer from "../components/UI/AnimatedContainer";
import styles from "../styles/_Careers.module.scss";
import { useEffect } from "react";
import axios from "axios";
import Container from "../components/UI/Container";
import { Link, useLoaderData } from "react-router-dom";

const CareerDetails = () => {
  const data = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatedContainer>
      <Container>
        <div style={{ padding: "8.375rem 0" }}>
          <div className={styles.card}>
            <h2 className={styles.title}>
              {data.title}
              <span className={styles.badge}>{data.location}</span>
            </h2>
            <ul className={styles.detailsList}>
              <h3>Description</h3>
              {data.description.split("\n").map((point, index) => (
                <li className={styles.item} key={index}>
                  {point.trim()}
                </li>
              ))}
            </ul>
            <ul className={styles.detailsList}>
              <h3>Responsibilities</h3>
              {data.responsibilities.split("\n").map((point, index) => (
                <li className={styles.item} key={index}>
                  {point.trim()}
                </li>
              ))}
            </ul>
            <div>
              <p className={styles.copyright}>&#169; {data.type}</p>
            </div>
            <button>
              <Link
                to={`/apply/${data.id}`}
                className={styles.applyButton}
              >
                Apply for this job
              </Link>
            </button>
          </div>
        </div>
      </Container>
    </AnimatedContainer>
  );
};
export default CareerDetails;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const careerId = params.id;

  let returnValue = "";
  try {
    const response = await axios.get(
      `https://backend.lixir-interiors.com/api/onejob/${careerId}`
    );

    const data = await response.data;

    returnValue = data.data;

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
