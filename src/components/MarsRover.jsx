import Card from "./Card";

import "./MarsRover.scss";

const MarsRover = ({ marsRover, onLike }) => {
  return (
    <div className="mars-rover">
      <Card items={marsRover} onLike={onLike} />
    </div>
  );
};

export default MarsRover;
