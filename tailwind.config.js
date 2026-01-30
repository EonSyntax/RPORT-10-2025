/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-primary",
    "border-primary/50",
    "hover:bg-primary/90",
    "bg-primary/90",
    "text-primary-foreground",
  ],
  theme: {
    extend: {
      colors: {
        primary: ({ opacityVariable, opacityValue }) => {
          if (opacityValue !== undefined)
            return `hsl(var(--primary) / ${opacityValue})`;
          if (opacityVariable !== undefined)
            return `hsl(var(--primary) / var(${opacityVariable}))`;
          return `hsl(var(--primary))`;
        },
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
    },
  },
  plugins: [],
};
