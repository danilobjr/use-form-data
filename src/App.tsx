import React, { FC, HTMLProps, useState } from 'react';
import classnames from 'classnames';
import './App.css';

type FormFieldProps = {
  message?: string
  valid?: boolean
} & HTMLProps<HTMLInputElement>;

const FormField: FC<FormFieldProps> = ({
  label,
  message,
  type = 'text',
  valid = true,
  value = '',
  ...otherProps
}) => (
  <div
    className={classnames('form-field', {
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
);

FormField.displayName = 'FormField';

function App() {
  const initialState = {
    login: '',
    password: '',
  };
  
  const [state, setState] = useState(initialState);

  return (
    <div className="app">
      <form className="form">
        <FormField
          label="Login"
          value={state.login}
          onChange={e => setState({ ...state, login: e.currentTarget.value })}
        />

        <FormField
          label="Password"
          type="password"
          value={state.password}
          onChange={e => setState({ ...state, password: e.currentTarget.value })}
        />

        <div className="actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default App;
