import { useEffect, useMemo, useState } from "react";
import { user } from "../interfaces/user";

export const useForm = (
  initialForm: user,
  formValidations: any | undefined | null
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof typeof formValidation] != null)
        return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: any) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: any = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(
        formState[formField as keyof user]
      )
        ? null
        : errorMessage;
      setFormValidation(formCheckedValues);
    }
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formValidation,
    isFormValid,
  };
};
