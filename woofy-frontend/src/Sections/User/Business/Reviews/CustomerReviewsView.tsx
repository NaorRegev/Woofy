import { FunctionComponent } from "react";
import Review from "../../../../components/review/Review";

const CustomerReviewsView: FunctionComponent = () => {
  return (
    <div className="self-stretch overflow-hidden flex flex-col items-center justify-start py-[20px] px-16 box-border gap-[50px] max-w-full text-center text-lg text-text-primary font-text-medium-normal lg:pl-8 lg:pr-8 lg:box-border mq1050:pt-8 mq1050:pb-8 mq1050:box-border mq750:gap-[25px] mq750:pt-[21px] mq750:pb-[21px] mq750:box-border">
      <div className="w-[560px] flex flex-col items-center justify-start gap-[16px] max-w-full">
        <h1 className="m-0 self-stretch relative text-29xl leading-[58px] font-bold mq450:text-10xl mq450:leading-[35px] mq1050:text-19xl mq1050:leading-[46px]">
          Customer Testimonials
        </h1>
        <div className="self-stretch relative leading-[150%]">
          See what customers say about you.
        </div>
        <div className="self-stretch flex flex-row items-center justify-center pt-[5px] px-5 pb-0 gap-[10px] text-left mq450:flex-wrap">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            alt=""
            src="/reviews-icon--star.svg"
          />
          <div className="relative leading-[150%] font-semibold">
            Your Review Score
          </div>
          <div className="relative leading-[150%] font-semibold inline-block min-w-[9px] mq450:w-full mq450:h-[9px]">
            •
          </div>
          <div className="relative leading-[150%] font-semibold inline-block min-w-[70px]">
            Number
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start max-w-full text-left text-base mq750:gap-[16px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[32px] max-w-full mq750:gap-[16px]">
          <div className="self-stretch flex flex-row flex-wrap items-center justify-center pt-[8.9px] px-[60px] pb-[9px] box-border gap-[48px] max-w-full mq1050:pl-[30px] mq1050:pr-[30px] mq1050:box-border mq750:gap-[24px]">
            <Review userAvatarImage="/user-avatar-image@2x.png" />
            <Review userAvatarImage="/user-avatar-image@2x.png" />
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-center pt-[8.9px] px-[60px] pb-[9px] box-border gap-[48px] max-w-full mq1050:pl-[30px] mq1050:pr-[30px] mq1050:box-border mq750:gap-[24px]">
            <Review userAvatarImage="/user-avatar-image1@2x.png" />
            <Review userAvatarImage="/user-avatar-image1@2x.png" />
          </div>
        </div>
      </div>
      <button className="cursor-pointer py-1.5 px-[19px] bg-[transparent] w-[100px] rounded-11xl box-border flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-gray-500 hover:box-border hover:border-[1px] hover:border-solid hover:border-gray-100">
        <div className="relative text-base leading-[150%] font-text-medium-normal text-text-primary text-left inline-block min-w-[60px]">
          View All
        </div>
      </button>
    </div>
  );
};

export default CustomerReviewsView;
