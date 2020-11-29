import Head from 'next/head'
import React, { FC, HTMLProps, useState } from 'react'
import cn from 'classnames'
import { FormField } from '../components'

const useFormData = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState(initialValues)

  const setFieldValue = <K extends keyof T>(fieldName: K) => (value: T[K]) => {
    setValues({
      ...values,
      [fieldName]: value,
    })
  }

  return {
    values,
    setFieldValue,
  }
}

const Index: FC = () => {
  const initialValues = {
    login: '',
    password: '',
  }

  type FormData = typeof initialValues

  // const { values, setFieldValue, errors, triggerValidation } = useFormData<typeof initialState>(initialState, validationSchema)
  const { values, setFieldValue } = useFormData(initialValues)

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
          <button type="submit">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Index
