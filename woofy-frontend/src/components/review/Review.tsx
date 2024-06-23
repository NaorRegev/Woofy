import { FunctionComponent } from "react";

export type CustomerTestimonialsReviewType = {
  userAvatarImage?: string;
};

const Review: FunctionComponent<
  CustomerTestimonialsReviewType
> = ({ userAvatarImage }) => {
  return (
    <div className="flex-1 rounded-26xl box-border overflow-hidden flex flex-col items-start justify-start py-[30px] px-[31px] gap-[32px] min-w-[270px] max-w-full text-left text-base text-text-primary font-text-medium-normal border-[1px] border-solid border-text-primary mq450:gap-[16px]">
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <div className="flex flex-row items-center justify-start pt-[5px] px-[46.5px] pb-0 gap-[10px] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:flex-wrap">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
            alt=""
            src="/reviews-icon--star1.svg"
          />
          <div className="relative leading-[150%] font-medium">
            Your Review Score
          </div>
          <div className="relative leading-[150%] font-medium inline-block min-w-[9px] mq750:w-full mq750:h-[9px]">
            •
          </div>
          <b className="relative leading-[150%] inline-block min-w-[53px]">
            x stars
          </b>
        </div>
        <div className="self-stretch relative leading-[150%]">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare."
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-[16px] mq450:flex-wrap">
        <img
          className="h-14 w-14 relative rounded-[50%] object-cover"
          alt=""
          src={userAvatarImage}
        />
        <div className="flex flex-col items-start justify-start">
          <div className="relative leading-[150%] font-medium inline-block min-w-[117px] whitespace-nowrap">
            Name Surname
          </div>
          <div className="relative leading-[150%] font-medium inline-block min-w-[66px]">
            Location
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
