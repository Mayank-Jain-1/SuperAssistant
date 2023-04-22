/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors:{
            charcoal: "#344055",
            celtic: "#266DD3",
            coolgray: "#888098",
            thistle: "#CFB3CD",
         }
      },
   },
   plugins: [],
};
