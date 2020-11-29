import Head from 'next/head'
import React, { FC, HTMLProps, useState } from 'react'
import cn from 'classnames'
import { FormField } from '../components'



const App: FC = () => {
  const initialState = {
    login: '',
    password: '',
  }

  const [state, setState] = useState(initialState);

  return (
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="form">
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
      </div>
    </div>
  )
}

export { App }