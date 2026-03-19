/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  // Point to web app's Tailwind CSS entry for class sorting
  tailwindStylesheet: "./apps/web/styles/globals.css",
}
