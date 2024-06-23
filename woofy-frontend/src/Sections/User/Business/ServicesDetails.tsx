import { FunctionComponent } from "react";
import TypesOfServiceRow from "../selectButtons/TypesOfServiceRow";
import AvailibilityOfServicesRow from "../selectButtons/AvailibilityOfServicesRow";
import AboutServices from "./AboutServicesRow";

const ServicesDetails: FunctionComponent = () => {
    return (
        <div className="w-full relative overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal]">
            <main className="self-stretch flex flex-row items-start justify-start max-w-full text-left text-base text-text-primary font-text-medium-normal mq1050:pl-5 mq1050:pr-5 mq1050:box-border">
                <section className="flex-1 flex flex-col items-start justify-start gap-[32px] max-w-[calc(100%_-_312px)] text-center text-29xl text-text-alternate font-text-medium-normal mq1050:max-w-full mq750:gap-[16px]">
                    <div className="self-stretch bg-app1 overflow-hidden flex flex-col items-center justify-start pt-[30px] px-5 pb-[60px] box-border max-w-full">
                        <div className="flex flex-row items-center justify-center max-w-full">
                            <h1 className="relative text-[48px] leading-[120%] font-inter text-white text-center">
                                Services Details
                            </h1>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start py-0 px-8 box-border max-w-full text-left text-base text-text-primary">
                        <div className="flex-1 flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-col items-start justify-start py-6 px-0 box-border gap-[8px] max-w-full">
                                <div className="self-stretch relative leading-[150%] font-semibold">
                                    Services Pictures
                                </div>
                                <div className="self-stretch flex flex-row items-center justify-start max-w-full">
                                    <div className="w-[560px] flex flex-row items-center justify-start py-0 px-0 box-border gap-[24px] max-w-full mq750:flex-wrap">
                                        <img
                                            className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0"
                                            loading="lazy"
                                            alt=""
                                            src="/service-avatar-image-1@2x.png"
                                        />
                                        <img
                                            className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0"
                                            loading="lazy"
                                            alt=""
                                            src="/service-avatar-image-1@2x.png"
                                        />
                                        <img
                                            className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0"
                                            loading="lazy"
                                            alt=""
                                            src="/service-avatar-image-1@2x.png"
                                        />
                                        <img
                                            className="h-[100px] w-[100px] relative object-cover min-h-[100px] shrink-0"
                                            loading="lazy"
                                            alt=""
                                            src="/service-avatar-image-1@2x.png"
                                        />
                                        <button className="cursor-pointer py-2 px-[9px] bg-[transparent] h-[42px] rounded-11xl box-border flex flex-row items-center justify-center gap-[7px] whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-dimgray-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                                            <img
                                                className="h-6 w-6 relative overflow-hidden shrink-0"
                                                alt=""
                                                src="/manage-button-icon--editalt.svg"
                                            />
                                            <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-darker text-left inline-block min-w-[87px]">
                                                Edit photos
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <TypesOfServiceRow
                                typesOfServiceLabel="Types of Service"
                                boarding="Boarding"
                                dayCare="Day Care"
                                sittingRadioButtonName="radioGroup-1"
                                sitting="Sitting"
                                walkingRadioButtonName="radioGroup-1"
                                walking="Walking"
                            />
                            <AvailibilityOfServicesRow
                                availibilityLabel="Availibility"
                                boardingService="Boarding Service:"
                                datesTimes={`Dates & Times`}
                                dayCareService="Day Care Service:"
                                datesTimes1={`Dates & Times`}
                                sittingService="Sitting Service:"
                                datesTimes2={`Dates & Times`}
                                walkingService="Walking Service:"
                                datesTimes3={`Dates & Times`}
                            />
                            <AvailibilityOfServicesRow
                                availibilityLabel="Prices"
                                boardingService="Boarding Price Per Day:"
                                datesTimes="Price ₪"
                                dayCareService="Day Care Price Per Day:"
                                datesTimes1="Price ₪"
                                sittingService="Sitting Price Per Visit:"
                                datesTimes2="Price ₪"
                                walkingService="Walking Price Per Walk:"
                                datesTimes3="Price ₪"
                                propMinWidth="37px"
                                propMinWidth1="56px"
                                propMinWidth2="56px"
                                propDisplay="unset"
                                propMinWidth3="unset"
                                propMinWidth4="56px"
                                propDisplay1="unset"
                                propMinWidth5="unset"
                                propMinWidth6="56px"
                            />
                            <TypesOfServiceRow
                                typesOfServiceLabel="Dog Sizes"
                                boardingRadioButtonName="radioGroup-2"
                                boarding="Small"
                                dayCareRadioButtonName="radioGroup-2"
                                dayCare="Medium"
                                sittingRadioButtonName="radioGroup-2"
                                sitting="Large"
                                walkingRadioButtonName="radioGroup-2"
                                walking="Giant"
                                propHeight="unset"
                                propFlexWrap="wrap"
                                propDisplay="inline-block"
                                propMinWidth="60px"
                                propFlexDirection="column"
                                propMinWidth1="41px"
                                propMinWidth2="61px"
                                propMinWidth3="43px"
                                propMinWidth4="41px"
                            />
                            <TypesOfServiceRow
                                typesOfServiceLabel="Dog Sizes"
                                boardingRadioButtonName="radioGroup-3"
                                boarding="Small"
                                dayCareRadioButtonName="radioGroup-3"
                                dayCare="Medium"
                                sittingRadioButtonName="radioGroup-3"
                                sitting="Large"
                                walkingRadioButtonName="radioGroup-3"
                                walking="Giant"
                                propHeight="unset"
                                propFlexWrap="wrap"
                                propDisplay="inline-block"
                                propMinWidth="60px"
                                propFlexDirection="column"
                                propMinWidth1="41px"
                                propMinWidth2="61px"
                                propMinWidth3="43px"
                                propMinWidth4="41px"
                            />
                            <div className="self-stretch box-border flex flex-row flex-wrap items-start justify-start pt-[22px] px-0 pb-6 gap-[24px] max-w-full border-t-[1px] border-solid border-text-primary">
                                <div className="flex-1 relative leading-[150%] font-semibold inline-block min-w-[105px]">
                                    Home Conditions
                                </div>
                                <div className="w-[720px] flex flex-col items-start justify-start py-0 px-[124px] box-border gap-[24px] max-w-full mq750:pl-[62px] mq750:pr-[62px] mq750:box-border">
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[45px]">
                                            Home
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[81px]">
                                            Apartment
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[128px]">
                                            Has Fenced Yard
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%]">
                                            Dogs Allowed on Furniture
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%]">
                                            Dogs Allowed on Bed
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-4"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[104px]">
                                            Non-Smoking
                                        </div>
                                    </div>
                                </div>
                                <button className="cursor-pointer py-2 px-5 bg-[transparent] h-[42px] rounded-11xl box-border flex flex-row items-start justify-start gap-[8px] whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-dimgray-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                                    <img
                                        className="h-6 w-6 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/manage-button-icon--editalt.svg"
                                    />
                                    <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-darker text-left inline-block min-w-[30px]">{`Edit `}</div>
                                </button>
                            </div>
                            <div className="self-stretch box-border flex flex-row flex-wrap items-start justify-start pt-[22px] px-0 pb-6 gap-[24px] max-w-full border-t-[1px] border-solid border-text-primary">
                                <div className="flex-1 relative leading-[150%] font-semibold inline-block min-w-[80px]">
                                    Pets in Home
                                </div>
                                <div className="w-[720px] flex flex-col items-start justify-start py-0 px-[124px] box-border gap-[24px] max-w-full mq750:pl-[62px] mq750:pr-[62px] mq750:box-border">
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-5"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[84px]">
                                            Own a Dog
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-5"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[80px]">
                                            Own a Cat
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-5"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[127px]">
                                            Own Caged Pets
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-5"
                                            />
                                        </div>
                                        <div className="relative leading-[150%] inline-block min-w-[107px]">
                                            Has Cheildren
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start gap-[12px]">
                                        <div className="h-[21px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border">
                                            <input
                                                className="cursor-pointer m-0 w-5 h-5 relative rounded-81xl bg-text-alternate box-border overflow-hidden shrink-0 border-[1px] border-solid border-text-primary"
                                                type="radio"
                                                name="radioGroup-5"
                                            />
                                        </div>
                                        <div className="relative leading-[150%]">
                                            Only One Client at a Time
                                        </div>
                                    </div>
                                </div>
                                <button className="cursor-pointer py-2 px-5 bg-[transparent] h-[42px] rounded-11xl box-border flex flex-row items-start justify-start gap-[8px] whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-dark hover:bg-dimgray-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-dimgray-100">
                                    <img
                                        className="h-6 w-6 relative overflow-hidden shrink-0"
                                        alt=""
                                        src="/manage-button-icon--editalt.svg"
                                    />
                                    <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-darker text-left inline-block min-w-[30px]">{`Edit `}</div>
                                </button>
                            </div>
                            <div className="self-stretch box-border flex flex-row flex-wrap items-start justify-start pt-[22px] px-0 pb-6 gap-[24px] max-w-full z-[1] border-t-[1px] border-solid border-text-primary">
                                <div className="flex-1 relative leading-[150%] font-semibold inline-block min-w-[82px]">
                                    Dog Capacity
                                </div>
                                <div className="flex flex-row items-start justify-start gap-[24px] max-w-full mq1050:flex-wrap">
                                    <div className="flex flex-col items-start justify-start py-0 pr-[234px] pl-[124px] box-border gap-[24px] max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[62px] mq750:pr-[117px] mq750:box-border">
                                        <div className="flex flex-row items-center justify-start gap-[6px] mq450:flex-wrap">
                                            <div className="relative leading-[150%]">{`Boarding & Day Care Capacity:`}</div>
                                            <div className="relative leading-[150%] inline-block min-w-[124px]">
                                                Number of Dogs
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px] max-w-full mq450:flex-wrap">
                                            <div className="relative leading-[150%]">{`Sitting & Walking Capacity:`}</div>
                                            <div className="relative leading-[150%] inline-block min-w-[124px]">
                                                Number of Dogs
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
                            <AboutServices />
                            <AboutServices />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ServicesDetails;
