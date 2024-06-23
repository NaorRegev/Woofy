import { FunctionComponent, useEffect, useState } from "react";
import { getImage } from "../../../../components/image/imageComponent";
import { BUSINESS_TYPES } from "../../../../models/Enums/Enums";
import {api} from "../../../../api/api";

export type UserReviewType = {
  avatarImage?: string;
  review: any;
};



const UserReview: FunctionComponent<UserReviewType> = ({ avatarImage, review }) => {

  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(avatarImage);


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (review.userId === null) return;
        const response = await api.get(`user/name/${review.userId}`);
        setUserName(response.data);
      } catch (error) {
        console.error(`Failed to fetch user name: ${error}`);
      }
    };

    fetchUserName();
  }, [review.userId]);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        if (review.userId === null) return;
        const response = await api.get(`user/${review.userId}`);
        const user = response.data;
        const image = await getImage(user.profilePhotoID);
        setUserImage(image);
      } catch (error) {
        console.error(`Failed to fetch user image: ${error}`);
      }
    };

    fetchUserImage();
  }, [review.userId]);

  function getServiceTypeName(serviceType: BUSINESS_TYPES): string {
    switch (serviceType) {
      case BUSINESS_TYPES.DOG_SITTER:
        return 'Dog Sitter';
      case BUSINESS_TYPES.DOG_WALK:
        return 'Dog Walker';
      case BUSINESS_TYPES.DAY_CARE:
        return 'Day Care';
      case BUSINESS_TYPES.BOARDING:
        return 'Boarding';
      default:
        return serviceType;
    }
  }

  return (
    <div className="flex-1 flex flex-col items-start justify-start py-4 px-8 box-border gap-[24px] min-w-[280px] max-w-full text-left text-base text-text-primary font-text-medium-normal">
      <div className="flex flex-row items-center justify-start gap-[20px] mq450:flex-wrap">
        <img
          className="h-14 w-14 relative rounded-[50%] object-cover"
          loading="lazy"
          alt=""
          src={userImage}
        />
        <div className="flex flex-col items-start justify-start">
          <div className="relative leading-[150%] font-semibold inline-block min-w-[119px]">
            {userName} {/* Display the user's name */}
          </div>
          <div className="relative leading-[150%] inline-block min-w-[36px]">
            {review.createdAt}
          </div>
          <div className="relative leading-[150%] inline-block min-w-[36px]">
            {getServiceTypeName(review.serviceType)}
          </div>
        </div>
      </div>
      <div className="overflow-hidden flex flex-row items-start justify-start gap-[4px]">
        {/* Display the rating as stars */}
        {[...Array(review.rating)].map((_, i) => (
          <img
            key={i}
            className="h-[18.9px] w-5 relative min-h-[19px]"
            alt=""
            src="/vector.svg"
          />
        ))}
      </div>
      <div className="self-stretch flex flex-col items-start justify-start text-lg">
        <div className="self-stretch relative leading-[150%]">
          {review.review}
        </div>
      </div>
    </div>
  );
};

export default UserReview;
