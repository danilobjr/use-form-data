import React, { FC, HTMLProps } from 'react';
import classnames from 'classnames';
import './App.css';

type FormFieldProps = {
  message?: string
  valid?: boolean
} & HTMLProps<HTMLFormElement>;

const FormField: FC<FormFieldProps> = ({
  label,
  message,
  type = 'text',
  valid = true,
  value = '' 
}) => (
  <div
    className={classnames('form-field', {
      '-not-valid': !valid
    })}
  >
    {label && <label className="label">{label}</label>}
    <input className="input" type={type} value={value} />
    {message && <span className="message">{message}</span>}
  </div>
);

function App() {
  return (
    <div className="app">
      <form className="form">
        <FormField
          label="Login"          
        />

        <FormField
          label="Password"
          type="password"
        />

        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default App;
