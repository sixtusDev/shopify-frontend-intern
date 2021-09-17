import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getMarsRoverPhotos } from "./services/marsRoverService";

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
  return (
    <div className="App">
      <ToastContainer style={{ fontSize: "1.3rem" }} />
    </div>
  );
}

export default App;
