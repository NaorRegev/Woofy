import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { BUSINESS_TYPES } from '../../../models/Enums/Enums';

export type ServiceOption = {
  label: string;
  value: BUSINESS_TYPES;
};

export type TypesOfServiceRowType = {
  typesOfServiceLabel?: string;
  boardingRadioButtonName?: string;
  boarding?: ServiceOption;
  dayCareRadioButtonName?: string;
  dayCare?: ServiceOption;
  sittingRadioButtonName?: string;
  sitting?: ServiceOption;
  walkingRadioButtonName?: string;
  walking?: ServiceOption;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propFlexWrap?: CSSProperties["flexWrap"];
  propDisplay?: CSSProperties["display"];
  propMinWidth?: CSSProperties["minWidth"];
  propFlexDirection?: CSSProperties["flexDirection"];
  propMinWidth1?: CSSProperties["minWidth"];
  propMinWidth2?: CSSProperties["minWidth"];
  propMinWidth3?: CSSProperties["minWidth"];
  propMinWidth4?: CSSProperties["minWidth"];

  showEditButton?: boolean; // New prop to indicate whether to show the edit button or not

  onServiceChange?: (service: BUSINESS_TYPES) => void; // Callback function to handle service change

};

const TypesOfServiceRow: FunctionComponent<TypesOfServiceRowType> = ({
  typesOfServiceLabel,
  boardingRadioButtonName,
  boarding,
  dayCareRadioButtonName,
  dayCare,
  sittingRadioButtonName,
  sitting,
  walkingRadioButtonName,
  walking,
  propHeight,
  propFlexWrap,
  propDisplay,
  propMinWidth,
  propFlexDirection,
  propMinWidth1,
  propMinWidth2,
  propMinWidth3,
  propMinWidth4,
  showEditButton = true,
  onServiceChange
}) => {
  const handleServiceChange = (service: BUSINESS_TYPES) => {
    if (onServiceChange) {
      onServiceChange(service); // Call the callback function with the selected service
    }
  };

  const typesOfServiceRowStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      flexWrap: propFlexWrap,
    };
  }, [propHeight, propFlexWrap]);

  const typesOfServiceStyle: CSSProperties = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propDisplay, propMinWidth]);

  const typesOfServiceRadioButtonsStyle: CSSProperties = useMemo(() => {
    return {
      flexDirection: propFlexDirection,
    };
  }, [propFlexDirection]);

  const boarding1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  const dayCare1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth2,
    };
  }, [propMinWidth2]);

  const sittingStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth3,
    };
  }, [propMinWidth3]);

  const walkingStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth4,
    };
  }, [propMinWidth4]);

  return (
    <div
      className="self-stretch h-[88px] box-border flex flex-row items-start justify-start py-6 px-0 gap-[24px] max-w-full text-left text-base text-text-primary font-text-medium-normal border-t-[1px] border-solid border-text-primary mq750:h-auto"
      style={typesOfServiceRowStyle}
    >
      <div
        className="flex-1 relative leading-[150%] font-semibold"
        style={typesOfServiceStyle}
      >
        {typesOfServiceLabel}
      </div>
      <div
        className="w-[720px] flex flex-row items-start justify-start py-0 px-[124px] box-border gap-[24px] max-w-[calc(100%_-_346px)] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:flex-wrap mq750:pl-[62px] mq750:pr-[62px] mq750:box-border"
        style={typesOfServiceRadioButtonsStyle}
      >
        <div className="flex flex-row items-start justify-start gap-[12px]">
          <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
            <input
              className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
              type="radio"
              name={boardingRadioButtonName}
              onClick={() => handleServiceChange(boarding?.value!)}
            />
          </div>
          <div
            className="relative leading-[150%] inline-block min-w-[68px]"
            style={boarding1Style}
          >
            {boarding?.label}
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[12px]">
          <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
            <input
              className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
              type="radio"
              name={dayCareRadioButtonName}
              onClick={() => handleServiceChange(dayCare?.value!)}
            />
          </div>
          <div
            className="relative leading-[150%] inline-block min-w-[70px]"
            style={dayCare1Style}
          >
            {dayCare?.label}
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[12px]">
          <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
            <input
              className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
              type="radio"
              name={sittingRadioButtonName}
              onClick={() => handleServiceChange(sitting?.value!)}
            />
          </div>
          <div
            className="relative leading-[150%] inline-block min-w-[49px]"
            style={sittingStyle}
          >
            {sitting?.label}
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[12px]">
          <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
            <input
              className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
              type="radio"
              name={walkingRadioButtonName}
              onClick={() => handleServiceChange(walking?.value!)}
            />
          </div>
          <div
            className="relative leading-[150%] inline-block min-w-[59px]"
            style={walkingStyle}
          >
            {walking?.label}
          </div>
        </div>
      </div>
      {showEditButton && ( // Conditionally render the edit button
        <button className="cursor-pointer py-2 px-5 bg-[transparent] h-[42px] rounded-11xl box-border flex flex-row items-start justify-start gap-[8px] whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-dimgray-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            alt=""
            src="/manage-button-icon--editalt.svg"
          />
          <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-darker text-left inline-block min-w-[30px]">{`Edit `}</div>
        </button>
      )}
    </div>
  );
};

export default TypesOfServiceRow;
