import React, { FC, HTMLProps } from 'react'
import cn from 'classnames'
import { path, pipe } from 'ramda'

type TextProps = {
  errorMessage?: string
  type?: 'text' | 'password'
  valid?: boolean
  onChange: (value: string) => void
} & Omit<HTMLProps<HTMLInputElement>, 'onChange'>

const Text: FC<TextProps> = ({
  label,
  errorMessage: message,
  valid,
  onChange,
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
      onChange={pipe(path(['currentTarget', 'value']), onChange)}
      {...otherProps}
    />

    {message && <span className="message">{message}</span>}
  </div>
)

Text.displayName = 'Text'

Text.defaultProps = {
  errorMessage: '',
  type: 'text',
  valid: true,
  value: '',
}

export { Text }
