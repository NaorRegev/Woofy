import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {useRouter} from "../../../routes/hooks";

const TypeOfUser: FunctionComponent = () => {
  const router = useRouter();

  const onCaregiverButtonTextClick = useCallback(() => {
    router.push("/business-registration-page");
  }, [router]);

  return (
    <div className="self-stretch bg-background-color-primary flex flex-row items-end justify-start pt-3 px-0 pb-6 box-border max-w-full text-center text-5xl text-text-primary font-text-medium-normal">
      <div className="flex-1 flex flex-col items-start justify-start gap-[8px] max-w-full">
        <h3 className="m-0 self-stretch relative text-inherit leading-[34px] font-semibold font-inherit mq450:text-lgi mq450:leading-[27px]">
          I consider myself a...
        </h3>
        <div className="self-stretch flex flex-row items-center justify-center pt-4 px-5 pb-0 gap-[16px] mq450:flex-wrap">
          <button className="cursor-pointer [border:none] py-2 px-5 bg-app1 rounded-11xl flex flex-row items-center justify-center whitespace-nowrap hover:bg-cornflowerblue">
            <div className="relative text-base leading-[150%] font-semibold font-text-medium-normal text-background-color-primary text-left inline-block min-w-[87px]">
              Dog Owner
            </div>
          </button>
          <button className="cursor-pointer py-1.5 px-[19px] bg-silver rounded-11xl flex flex-row items-center justify-center border-[1px] border-solid border-text-primary hover:bg-gray-300 hover:box-border hover:border-[1px] hover:border-solid hover:border-darkslategray">
            <div
              className="relative text-base leading-[150%] font-semibold font-text-medium-normal text-text-primary text-left inline-block min-w-[76px] cursor-pointer"
              onClick={onCaregiverButtonTextClick}
            >
              Caregiver
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeOfUser;
