import { useMemo, useState } from "react";

function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export const useFormBuilder = (initialForm = {}) => {
  const form = {};
  const formFields = {};

  for (const key of Object.keys(initialForm)) {
    form[key] = initialForm[key][0];
    formFields[`${key}Field`] = initialForm[key][1]
      ? initialForm[key][1]
      : null;
  }

  console.log(formFields);
  const [formState, setFormState] = useState(form);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(form);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
