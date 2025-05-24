import { CDN_LINK } from "../utils/constants";

const CusinesCard = (props) => {
  const { imageId } = props;
  return (
    <div className="m-5 h-[175px] w-[150px]">
      <img
        alt="cusines-logo"
        className="res-logo rounded-lg h-[175px] w-[150px] "
        src={CDN_LINK + imageId}
      />
    </div>
  );
};

export default CusinesCard;
