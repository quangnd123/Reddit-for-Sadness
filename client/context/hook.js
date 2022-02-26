import { useState } from "react";

export const useForm = (callback, initialState) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e, data) => {
    setValues({ ...values, [data.name]: data.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
