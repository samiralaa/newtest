/* eslint-disable react/prop-types */
import styles from "../styles/_Careers.module.scss";
import AnimatedContainer from "../components/UI/AnimatedContainer";
import Container from "../components/UI/Container";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Link } from "react-router-dom";

const Careers = () => {
  const data = useLoaderData();
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const careersPerPage = 3; // Number of careers per page
  const offset = currentPage * careersPerPage;
  const currentCareers = data.careers.data.slice(
    offset,
    offset + careersPerPage
  );
  const pageCount = Math.ceil(data.careers.data.length / careersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <AnimatedContainer>
        <div style={{ padding: "8.375rem 0" }}>
          <Container>
            <div>
              <h1
                className={`${styles.welcome} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("Careers.header")}
              </h1>
              <h3
                className={`${styles.history} ${
                  i18n.language === "ar" ? styles.ar : ""
                }`}
              >
                {t("Careers.des")}
              </h3>
            </div>
          </Container>
          <Container>
            {currentCareers.map((career) => (
              <Link key={career.id} to={`/Careers/${career.id}`}>
                <div className={styles.card}>
                  <h2 className={styles.title}>
                    {career.title}
                    <span className={styles.badge}>{career.location}</span>
                  </h2>
                  <p>{career.summery}</p>

                  <div>
                    <p className={styles.copyright}>&#169; {career.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Container>
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      </AnimatedContainer>
    </>
  );
};
export default Careers;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let returnValue = "";
  try {
    const response = await axios.get(
      "https://backend.lixir-interiors.com/api/alljobs"
    );
    const data = response.data;
    returnValue = {
      careers: data,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  return returnValue;
}
