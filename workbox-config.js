export default {
  globDirectory: "dist/",
  globPattern: "**/*.{js,css,html,ico,png,svg}",
  globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
  swDest: "sw",
};
