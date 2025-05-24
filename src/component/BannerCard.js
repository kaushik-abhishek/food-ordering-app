import { CDN_LINK } from "../utils/constants";

const BannerCard = (props) => {
  const { imageId } = props;
  console.log(props);

  return (
    <div className="m-5 h-[15rem] w-[23.438rem]">
      <img
        alt="Banner-logo"
        className="res-logo rounded-lg"
        src={CDN_LINK + imageId}
      />
    </div>
  );
};

export default BannerCard;
