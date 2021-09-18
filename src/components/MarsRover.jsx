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
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2019-06-03"));

  useEffect(() => {
    const fetchMarsRoverPhotos = async () => {
      // Format date with the pattern used for calling nasa API
      const date = moment(startDate).format("YYYY-MM-DD");
      try {
        setLoading(true);
        let {
          data: { photos },
        } = await getMarsRoverPhotos(date);

        // Get the likes of mars rover photo from local storage based
        // on date
        const likesInLocalStorage = JSON.parse(
          localStorage.getItem(`mars-rover-likes-${date}`)
        );
        if (likesInLocalStorage && likesInLocalStorage.length) {
          // Map all likes to their ids using hash table
          const likesHashTable = {};
          for (let i = 0; i < likesInLocalStorage.length; i++) {
            likesHashTable[likesInLocalStorage[i].id] =
              likesInLocalStorage[i].like;
          }
          // Create a new array and map the likes from local storage
          // to each item
          photos = photos.map((m) => ({ ...m, like: likesHashTable[m.id] }));
        }
        setMarsRovers(photos);
      } catch (ex) {
        if (ex.response) {
          toast.error(ex.response.data.error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMarsRoverPhotos();
  }, [startDate]);

  const handleLike = ({ target: { id } }) => {
    // Logic for handling likes
    const date = moment(startDate).format("YYYY-MM-DD");
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
    // Map likes to a new object and save to local Storage
    const likes = marsRoverPhotos.map((m) =>
      m.like ? { id: m.id, like: m.like } : { id: m.id, like: false }
    );
    // Store likes in local storage for persistence
    localStorage.setItem(`mars-rover-likes-${date}`, JSON.stringify(likes));
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
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
      ) : marsRovers.length ? (
        marsRovers.map(({ camera, earth_date, img_src, id, like, rover }) => (
          <div className="mars-rover" key={id}>
            <Card
              title={rover.name}
              image={img_src}
              text={camera.name + " - " + camera.full_name}
              id={id}
              like={like}
              date={earth_date}
              onLike={handleLike}
            />
          </div>
        ))
      ) : (
        <div style={{ textAlign: "center" }}>
          There are no pictures to display for the date:{" "}
          {moment(startDate).format("YYYY-MM-DD")}
        </div>
      )}
    </React.Fragment>
  );
};

export default MarsRover;
