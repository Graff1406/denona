export default (options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat => {
  return new Intl.DateTimeFormat(navigator.language, options);
};
