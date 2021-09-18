import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";
import { getMarsRoverPhotos } from "./services/marsRoverService";
import MarsRover from "./components/MarsRover";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  const [marsRovers, setMarsRovers] = useState([]);
  useEffect(() => {
    const fetchMarsRoverPhotos = async () => {
      try {
        const {
          data: { photos },
        } = await getMarsRoverPhotos();
        setMarsRovers(photos);
        console.log(photos);
      } catch ({ response: { data } }) {
        toast.error(data.error.message);
      }
    };
    fetchMarsRoverPhotos();
  }, []);

  const handleLike = ({ target: { id } }) => {
    const marsRover = marsRovers.find((m) => m.id === parseInt(id));
    let marsRoverPhotos;
    if (marsRover.like) {
      marsRoverPhotos = marsRovers.map((m) =>
        m.id === parseInt(id) ? { ...m, like: !m.like } : { ...m }
      );
    } else {
      marsRoverPhotos = marsRovers.map((m) =>
        m.id === parseInt(id) ? { ...m, like: true } : { ...m }
      );
    }
    setMarsRovers(marsRoverPhotos);
  };

  return (
    <div className="App">
      <div className="spinner-container">
        <Spinner
          style={{ height: "50px", width: "50px" }}
          className="spinner"
          thickness="5px"
          speed="0.65s"
          label="Loading"
          emptyColor="gray.200"
          color="#be7136"
        />
      </div>
      {marsRovers.map((marsRover) => (
        <MarsRover
          key={marsRover.id}
          marsRover={marsRover}
          onLike={handleLike}
        />
      ))}
      <ToastContainer style={{ fontSize: "1.3rem" }} />
    </div>
  );
}

export default App;
