import React, { useEffect, useState } from "react";
import moment from "moment";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { getMarsRoverPhotos } from "../services/marsRoverService";
import Header from "./Header";
import Card from "./Card";

import "./MarsRover.scss";

const MarsRover = () => {
  const [marsRovers, setMarsRovers] = useState([]);
  const [roverDate, setRoverDate] = useState("2019-6-3");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchMarsRoverPhotos = async () => {
      try {
        setLoading(true);
        const {
          data: { photos },
        } = await getMarsRoverPhotos(roverDate);
        setMarsRovers(photos);
        console.log(photos);
      } catch (ex) {
        if (ex.response) {
          toast.error(ex.response.data.error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMarsRoverPhotos();
  }, [roverDate]);

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

  const handleDateSelect = (date) => {
    const roverDate = moment(date).format("YYYY-MM-DD");
    setStartDate(date);
    setRoverDate(roverDate);
    console.log(date);
  };

  return (
    <React.Fragment>
      <Header onDateSelect={handleDateSelect} startDate={startDate} />
      {loading ? (
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
      ) : (
        marsRovers.map((marsRover) => (
          <div className="mars-rover" key={marsRover.id}>
            <Card items={marsRover} onLike={handleLike} />
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default MarsRover;
