import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type RowType = {
  iconSun?: string;
  boardingButton?: string;
  boardingButton1?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propMinWidth1?: CSSProperties["minWidth"];
};

const Row: FunctionComponent<RowType> = ({
  iconSun,
  boardingButton,
  boardingButton1,
  propFlex,
  propMinWidth,
  propMinWidth1,
}) => {
  const columnStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const boardingButtonStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const boardingButton1Style: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <div className="w-[616px] rounded-2xl box-border flex flex-row items-center justify-center pt-6 px-0 pb-[22px] text-left text-xl text-text-primary font-text-medium-normal border-b-[1px] border-solid border-color-neutral-neutral">
      <div
        className="flex flex-col items-center justify-center py-0.5 px-[77.5px]"
        style={columnStyle}
      >
        <div className="rounded-11xl flex flex-row items-center justify-center py-0 pr-4 pl-2 gap-[8px]">
          <div className="flex flex-col items-center justify-center py-2 pr-0 pl-2">
            <img
              className="w-6 h-6 relative overflow-hidden shrink-0"
              alt=""
              src={iconSun}
            />
          </div>
          <b
            className="relative leading-[140%] inline-block min-w-[89px] mq450:text-base mq450:leading-[22px]"
            style={boardingButtonStyle}
          >
            {boardingButton}
          </b>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-0 px-[78px]">
        <div className="rounded-11xl flex flex-row items-center justify-center py-0 pr-4 pl-2">
          <div className="flex flex-row items-center justify-center py-2 pr-0 pl-2">
            <b className="relative leading-[140%] inline-block min-w-[36px] mq450:text-base mq450:leading-[22px]">
              170
            </b>
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0"
              alt=""
              src="/icon--shekel.svg"
            />
            <div
              className="relative text-base leading-[150%] font-medium text-color-neutral-neutral text-right inline-block min-w-[60px]"
              style={boardingButton1Style}
            >
              {boardingButton1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row;
