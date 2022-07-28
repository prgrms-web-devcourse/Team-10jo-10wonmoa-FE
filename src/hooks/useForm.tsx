import { useState } from 'react';

const useForm = <T,>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    custumValue?: string
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: custumValue ?? value });
  };

  return { formValues: values, handleChange };
};

export default useForm;
