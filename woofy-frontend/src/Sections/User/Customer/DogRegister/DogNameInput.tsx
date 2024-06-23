import { FunctionComponent } from "react";

export type DogNameInputType = {
  dogNameLabel?: string;
  dogNamePlaceholderPlaceho?: string;
};

const DogNameInput: FunctionComponent<DogNameInputType> = ({
  dogNameLabel,
  dogNamePlaceholderPlaceho,
}) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start gap-[8px] max-w-full text-left text-base text-text-primary font-text-medium-normal">
      <div className="self-stretch relative leading-[150%]">{dogNameLabel}</div>
      <div className="self-stretch bg-background-color-primary box-border flex flex-row items-center justify-start py-2.5 px-[11px] max-w-full border-[1px] border-solid border-color-neutral-neutral-light">
        <input
          className="w-full [border:none] [outline:none] font-roboto text-base bg-[transparent] h-6 flex-1 relative leading-[150%] text-color-neutral-neutral text-left inline-block min-w-[250px] max-w-full p-0"
          placeholder={dogNamePlaceholderPlaceho}
          type="text"
        />
      </div>
    </div>
  );
};

export default DogNameInput;
