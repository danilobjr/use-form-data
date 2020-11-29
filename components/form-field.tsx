import React, { FC, HTMLProps } from 'react'
import cn from 'classnames'

type FormFieldProps = {
  message?: string
  valid?: boolean
} & HTMLProps<HTMLInputElement>

const FormField: FC<FormFieldProps> = ({
  label,
  message,
  type = 'text',
  valid = true,
  value = '',
  ...otherProps
}) => (
  <div
    className={cn('form-field', {
      '-not-valid': !valid
    })}
  >
    {label && <label className="label">{label}</label>}

    <input 
      className="input"
      type={type}
      value={value}
      {...otherProps}
    />

    {message && <span className="message">{message}</span>}
  </div>
)

FormField.displayName = 'FormField'

FormField.defaultProps = {
  message: '',
  type: 'text',
  valid: true,
  value: '',
}

export { FormField }