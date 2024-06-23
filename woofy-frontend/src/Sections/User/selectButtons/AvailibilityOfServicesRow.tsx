import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type AvailibilityOfServicesRowType = {
  availibilityLabel?: string;
  boardingService?: string;
  datesTimes?: string;
  dayCareService?: string;
  datesTimes1?: string;
  sittingService?: string;
  datesTimes2?: string;
  walkingService?: string;
  datesTimes3?: string;

  /** Style props */
  propMinWidth?: CSSProperties["minWidth"];
  propMinWidth1?: CSSProperties["minWidth"];
  propMinWidth2?: CSSProperties["minWidth"];
  propDisplay?: CSSProperties["display"];
  propMinWidth3?: CSSProperties["minWidth"];
  propMinWidth4?: CSSProperties["minWidth"];
  propDisplay1?: CSSProperties["display"];
  propMinWidth5?: CSSProperties["minWidth"];
  propMinWidth6?: CSSProperties["minWidth"];
};

const AvailibilityOfServicesRow: FunctionComponent<
  AvailibilityOfServicesRowType
> = ({
  availibilityLabel,
  boardingService,
  datesTimes,
  dayCareService,
  datesTimes1,
  sittingService,
  datesTimes2,
  walkingService,
  datesTimes3,
  propMinWidth,
  propMinWidth1,
  propMinWidth2,
  propDisplay,
  propMinWidth3,
  propMinWidth4,
  propDisplay1,
  propMinWidth5,
  propMinWidth6,
}) => {
  const availibilityLabelStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const datesTimesStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const datesTimes1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth2,
    };
  }, [propMinWidth2]);

  const sittingServiceStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth3,
    };
  }, [propDisplay, propMinWidth3]);

  const datesTimes2Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth4,
    };
  }, [propMinWidth4]);

  const walkingServiceStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay1,
      minWidth: propMinWidth5,
    };
  }, [propDisplay1, propMinWidth5]);

  const datesTimes3Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth6,
    };
  }, [propMinWidth6]);

  return (
    <div className="self-stretch box-border flex flex-row flex-wrap items-start justify-start pt-[22px] px-0 pb-6 gap-[24px] max-w-full text-left text-base text-text-primary font-text-medium-normal border-t-[1px] border-solid border-text-primary">
      <div
        className="flex-1 relative leading-[150%] font-semibold inline-block min-w-[63px]"
        style={availibilityLabelStyle}
      >
        {availibilityLabel}
      </div>
      <div className="flex flex-row items-start justify-start gap-[24px] max-w-full mq1050:flex-wrap">
        <div className="flex flex-col items-start justify-start py-0 pr-[346px] pl-[124px] box-border gap-[24px] max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[62px] mq750:pr-[173px] mq750:box-border">
          <div className="flex flex-row items-center justify-start gap-[6px]">
            <div className="relative leading-[150%]">{boardingService}</div>
            <div
              className="relative leading-[150%] inline-block min-w-[109px]"
              style={datesTimesStyle}
            >
              {datesTimes}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[6px]">
            <div className="relative leading-[150%]">{dayCareService}</div>
            <div
              className="relative leading-[150%] inline-block min-w-[109px]"
              style={datesTimes1Style}
            >
              {datesTimes1}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[6px]">
            <div
              className="relative leading-[150%] inline-block min-w-[115px]"
              style={sittingServiceStyle}
            >
              {sittingService}
            </div>
            <div
              className="relative leading-[150%] inline-block min-w-[109px]"
              style={datesTimes2Style}
            >
              {datesTimes2}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[6px]">
            <div
              className="relative leading-[150%] inline-block min-w-[125px]"
              style={walkingServiceStyle}
            >
              {walkingService}
            </div>
            <div
              className="relative leading-[150%] inline-block min-w-[109px]"
              style={datesTimes3Style}
            >
              {datesTimes3}
            </div>
          </div>
        </div>
        <button className="cursor-pointer py-1.5 px-[19px] bg-[transparent] rounded-11xl flex flex-row items-center justify-center gap-[8px] whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-dimgray-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
            alt=""
            src="/manage-button-icon--editalt.svg"
          />
          <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-darker text-left inline-block min-w-[30px]">{`Edit `}</div>
        </button>
      </div>
    </div>
  );
};

export default AvailibilityOfServicesRow;
