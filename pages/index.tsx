import Head from 'next/head'
import React, { FC, HTMLProps, useState, useEffect } from 'react'
import cn from 'classnames'
import { object, string, ObjectSchema, ValidationError } from 'yup'
import { FormField } from '../components'

const useFormData = <T extends Record<string, any>>(initialValues: T, validationSchema: ObjectSchema<T>) => {
  const [values, setValues] = useState(initialValues)
  const [valid, setValid] = useState(true)
  const [errors, setErrors] = useState<ValidationError[]>([])

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

  return {
    values,
    errors,
    setFieldValue,
    isValid,
  }
}

type FormData = {
  login: string
  password: string
}

let validationSchema = object().shape<FormData>({
  login: string().required(),
  password: string().required(),
});

const Index: FC = () => {
  const initialValues: FormData = {
    login: '',
    password: '',
  }

  // const { values, setFieldValue, errors, triggerValidation } = useFormData<typeof initialState>(initialState, validationSchema)
  const { values, errors, setFieldValue, isValid } = useFormData(initialValues, validationSchema)
  console.log(errors)

  const handleSubmit = () => {
    if (isValid()) {
      alert('ok')
    }
  }

  return (
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="form">
        <FormField.Text
          label="Login"
          value={values.login}
          onChange={setFieldValue('login')}
        />

        <FormField.Text
          label="Password"
          type="password"
          value={values.password}
          onChange={setFieldValue('password')}
        />

        <div className="actions">
          <button type="submit" onClick={handleSubmit}>Login</button>
        </div>

        <span>Valid: {String(isValid())}</span>
      </div>
    </div>
  )
}

export default Index
