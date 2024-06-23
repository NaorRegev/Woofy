/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-color-primary": "#fff",
        app1: "#006cbf",
        "text-alternate": "#fff",
        "color-neutral-neutral": "#666",
        "text-primary": "#000",
        "color-neutral-neutral-light": "#aaa",
        "color-neutral-neutral-lighter": "#ccc",
        cornflowerblue: "#2691e6",
        darkgray: "#b3b3b3",
        "color-neutral-neutral": "#666",
        gray: {
          "100": "#808080",
          "200": "#787878",
          "300": "rgba(133, 133, 133, 0.1)",
          "400": "rgba(120, 120, 120, 0.09)",
          "500": "rgba(128, 128, 128, 0.09)",
        },
        "color-neutral-neutral-dark": "#444",
        silver: "rgba(185, 185, 185, 0.1)",
        darkslategray: "#333",
        "color-neutral-neutral-darker": "#222",
      },
      spacing: {},
      fontFamily: {
        "text-medium-normal": "Inter",
        volkhov: "Volkhov",
        roboto: "Roboto",
      },
      borderRadius: {
        mini: "15px",
        "11xl": "30px",
        "3xs": "10px",
      },
    },
    fontSize: {
      lg: "18px",
      base: "16px",
      "21xl": "40px",
      "5xl": "24px",
      "13xl": "32px",
      "9xl": "28px",
      lgi: "19px",
      "37xl": "56px",
      "15xl": "34px",
      "26xl": "45px",
      inherit: "inherit",
      "base": "16px",
      "xl": "20px",
      "13xl": "32px",
    },
    screens: {
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1025: {
        raw: "screen and (max-width: 1025px)",
      },
      mq900: {
        raw: "screen and (max-width: 900px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
