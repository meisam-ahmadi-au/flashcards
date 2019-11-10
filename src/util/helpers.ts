export const randomBackgroundColor = () => ({
  background: `#${Math.random()
    .toString(16)
    .substr(2, 6)}`
});
