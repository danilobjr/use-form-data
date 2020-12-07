import { ObjectSchema, ValidationError } from 'yup'
import { useState, useEffect } from "react";
import { anyPass, isEmpty, isNil } from "ramda";

type Errors<T> = Record<keyof T, ValidationError>

const useFormData = <T extends Record<string, any>>(initialValues: T, validationSchema: ObjectSchema<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors<T>>(null)
  const [validationTriggered, setValidationTriggered] = useState(false);

  const validate = () => {
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => setErrors(null))
      .catch((error) => {
        const errorsAsKeyValuePairs = error.inner.reduce((result, error) => {
          result[error.path] = error;
          return result;
        }, {});

        return setErrors(errorsAsKeyValuePairs);
      });
  };

  useEffect(validate, [JSON.stringify(values), validationTriggered]);

  const setFieldValue = <K extends keyof T>(fieldName: K) => (value: T[K]) => {
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  const getErrorMessageByField = <K extends keyof T>(fieldName: K) =>
    validationTriggered && errors?.[fieldName]?.message;
  const isValid = () => anyPass([isEmpty, isNil])(errors);
  const triggerValidation = () => setValidationTriggered(true);

  return {
    values,
    errors,
    validationTriggered,
    setFieldValue,
    getErrorMessageByField,
    isValid,
    triggerValidation,
  };
};

export { useFormData }
