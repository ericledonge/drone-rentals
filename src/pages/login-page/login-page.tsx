import './login-page.scss';

import React from 'react';

import { Action } from '../../domain/reducers/reducers';

type LoginPageProps = {
  dispatch: React.Dispatch<Action>;
};

const LoginPage = ({ dispatch }: LoginPageProps) => {
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      emailInput: HTMLInputElement;
    };
    dispatch({ payload: formElements.emailInput.value, type: 'SET_USER' });
  };

  return (
    <div className="login-page">
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-section">
          <label htmlFor="email" className="form-field">
            Email
          </label>

          <input name="emailInput" type="email" placeholder="joe@example.com" required />
        </div>

        <div className="form-section">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
