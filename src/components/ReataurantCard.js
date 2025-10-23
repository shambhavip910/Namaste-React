import { CDN_URL } from "../utils/constant";
import { ALT_IMG } from "../utils/constant";

const RestaurantCard = (props) => {
  const { resdata } = props;
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    slaString,
    cloudinaryImageId,
  } = resdata?.info;

  return (
    <div className="res-card">
      <img
  className="reslogo"
  src={
    cloudinaryImageId
      ? CDN_URL + cloudinaryImageId 
      : ALT_IMG
  }
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = ALT_IMG;
  }}
  alt={name}
/>

      <h3>{name}</h3>
      {/* <p style={{ fontStyle: "italic" }}>{cuisines.join(", ")}</p> */}
      <i> {cuisines.join(", ")}</i>
      <h5>{avgRating}★</h5>
      <h5>{costForTwo}</h5>
      <h5>{slaString}</h5>
    </div>
  );
};
export default RestaurantCard;