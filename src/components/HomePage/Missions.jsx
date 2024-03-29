/* eslint-disable react/prop-types */
import styles from "../../styles/_Missions.module.scss";
import Container from "../UI/Container";
import MissionCard from "../Missions/MissionCard";
const Missions = ({ subClass, missions }) => {
  return (
    <div className={`${styles.missions} ${subClass ? subClass : ""}`}>
      <Container subClass="sm">
        <ul className={styles.missionsList}>
          {missions.map((item, index) => {
            return (
              <li key={index}>
                <MissionCard data={item} index={index} />
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
export default Missions;
