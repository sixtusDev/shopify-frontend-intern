import moment from "moment";
import "./Card.scss";

const Card = ({ items, onLike }) => {
  const { camera, earth_date, img_src, rover, id, like } = items;
  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__title">{rover.name}</h3>
      </div>
      <img className="card__image" alt="card" src={img_src} />
      <div className="card__body">
        <p className="card__text">
          {camera.name} - {camera.full_name}
        </p>
        <p className="card__date">
          Date: {moment(earth_date).format("DD-MM-YYYY")}
        </p>
      </div>
      <div className="card__footer">
        <button className="card__button" id={id} onClick={onLike}>
          {like ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default Card;
