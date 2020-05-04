export const isEmail = (email) => {
  const rule = /^\S+@\S+\.\S+$/;
  return email.match(rule);
};
