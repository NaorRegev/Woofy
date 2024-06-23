import { FunctionComponent } from "react";
import { useNavigate } from 'react-router-dom';

export type NavbarPreLoginType = {
  className?: string;
};

const NavbarPreLogin: FunctionComponent<NavbarPreLoginType> = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`self-stretch bg-background-color-primary overflow-hidden flex flex-row items-start justify-start py-4 px-16 box-border top-[0] z-[99] sticky max-w-full text-left text-9xl text-text-primary font-volkhov mq750:pl-8 mq750:pr-8 mq750:box-border ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
        <div className="h-10 w-[168px] flex flex-row items-center justify-between relative">
          <div className="!m-[0] absolute top-[-10px] left-[0px] flex flex-row items-center justify-start">
            <img
              className="h-[60px] w-[60px] relative rounded-[50%] object-cover"
              loading="lazy"
              alt=""
              src="/photo-in-ellipse@2x.png"
            />
          </div>
          <div className="h-[31px] !m-[0] absolute top-[4.5px] left-[47px] flex flex-row items-start justify-start py-0 pr-0 pl-3 box-border z-[1]">
            <div className="mt-[-9.700000000000728px] flex flex-row items-start justify-start p-2.5">
              <a className="[text-decoration:none] relative leading-[36px] font-bold text-[inherit] inline-block min-w-[91px] whitespace-nowrap">
                Woofy
              </a>
            </div>
          </div>
        </div>
        <div className="w-[601px] flex flex-row items-center justify-center gap-[32px] max-w-full text-base font-text-medium-normal mq750:gap-[16px] mq1050:w-[251px]">
          <div className="flex-1 overflow-hidden flex flex-row items-start justify-start gap-[32px] max-w-full mq450:gap-[16px] mq1050:hidden">
            <div
              className="relative leading-[150%] inline-block min-w-[45px] cursor-pointer"
              onClick={() => navigate("/Hero-page")}
            >
              Home
            </div>
            <div
              className="relative leading-[150%] inline-block min-w-[66px] cursor-pointer"
              onClick={() => navigate("/search-page")}
            >
              Discover
            </div>
            <div
              className="relative text-lg leading-[150%] font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Become a Caregiver
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[16px]">
            <button
              className="cursor-pointer py-1.5 px-[19px] bg-[transparent] rounded-11xl flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral hover:box-border hover:border-[1px] hover:border-solid hover:border-gray-700"
              onClick={() => navigate("/sign-up")}
              style={{
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EEEEEE')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <b className="relative text-base leading-[150%] font-semibold font-text-medium-normal text-text-primary text-left inline-block min-w-[70px]">
                Join now
              </b>
            </button>

            <button
              className="cursor-pointer [border:none] py-2 px-5 bg-app1 rounded-11xl flex flex-row items-center justify-center whitespace-nowrap hover:bg-cornflowerblue"
              onClick={() => navigate("*")}
            >
              <b className="relative text-base leading-[150%] font-semibold font-text-medium-normal text-background-color-primary text-left inline-block min-w-[53px]">
                Sign in
              </b>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarPreLogin;
