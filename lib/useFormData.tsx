import { ObjectSchema, ValidationError } from 'yup'
import { useState, useEffect } from 'react'

const useFormData = <T extends Record<string, any>>(initialValues: T, validationSchema: ObjectSchema<T>) => {
  const [values, setValues] = useState(initialValues)
  const [valid, setValid] = useState(true)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [validationTriggered, setValidationTriggered] = useState(false)

  useEffect(() => {
    validationSchema
      .isValid(values)
      .then(setValid)
      .catch(console.error)

    validationSchema
      .validate(values, { abortEarly: false })
      .catch((error) => setErrors(error?.inner))
  }, [JSON.stringify({ values, errors })])

  const setFieldValue = <K extends keyof T>(fieldName: K) => (value: T[K]) => {
    setValues({
      ...values,
      [fieldName]: value,
    })
  }

  const isValid = () => valid

  const triggerValidation = () => setValidationTriggered(true)

  return {
    values,
    errors,
    setFieldValue,
    isValid,
    validationTriggered,
    triggerValidation,
  }
}

export { useFormData }
