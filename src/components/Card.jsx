import moment from "moment";
import "./Card.scss";

const Card = ({ title, onLike, image, text, id, like, date }) => {
  return (
    <div className="card">
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
      </div>
      <img className="card__image" alt="card" src={image} />
      <div className="card__body">
        <p className="card__text">{text}</p>
        <p className="card__date">Date: {moment(date).format("DD-MM-YYYY")}</p>
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
