export const formValidations = {
  isEmail: (value) => {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(value);
  },
  required: (value) => value !== null && value.trim() !== "",
  minLngth: (value, length) => value.length >= length,
};
