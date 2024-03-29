import AnimatedContainer from "../components/UI/AnimatedContainer";
import Landing from "../components/HomePage/Landing";
import Services from "../components/HomePage/Services";
import Missions from "../components/HomePage/Missions";
import LatestProjects from "../components/HomePage/LatestProjects";
import Clients from "../components/HomePage/Clients";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { missions } from "../lib/missions";
import { clients } from "../lib/clients";
import { useEffect } from "react";

const HomePage = () => {
  const data = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AnimatedContainer>
      <Landing />
      <LatestProjects projects={data.latestProjects} />
      <Services services={data.services} />
      <Missions missions={data.missions} />
    
      <Clients clients={data.clients} />
    </AnimatedContainer>
  );
};
export default HomePage;
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  let returnValue = "";
  try {
    const apiUrl1 = "https://backend.lixir-interiors.com/api/serves/index";
    const apiUrl2 = "https://backend.lixir-interiors.com/api/latest/products";

    const [response1, response2] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2),
    ]);
    const data1 = await response1.data;
    const data2 = await response2.data;
    const data3 = missions;
    const data4 = clients;
    returnValue = {
      services: data1.serevs,
      latestProjects: data2.projects,
      missions: data3,
      clients: data4,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  return returnValue;
}
