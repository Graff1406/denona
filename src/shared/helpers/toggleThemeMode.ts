export default (method: "add" | "remove") => {
  const scrollbars = document.querySelectorAll(".scrollbar");
  document.documentElement.classList[method]("dark");
  scrollbars.forEach((el) => el.classList[method]("scrollbar-dark"));
};
