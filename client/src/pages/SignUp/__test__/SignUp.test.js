import React from 'react';
import SignupPage from '../SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('signup tests', () => {
  let usernameInput;
  let emailInput;
  let passwordInput;
  let passswordConfirmationInput;
  let button;
  let alert;

  beforeEach(() => {
    // Render the component and initialize element before each test.
    render(
      <Router>
        <SignupPage />
      </Router>
    );
    usernameInput = screen.getByPlaceholderText('Username');
    emailInput = screen.getByPlaceholderText('Email');
    passwordInput = screen.getByPlaceholderText('Password');
    passswordConfirmationInput =
      screen.getByPlaceholderText('Confirm Password');
    button = screen.getByRole('button');
    alert = screen.queryByTestId('alert-element');
  });
  it('renders properly on initial render', async () => {
    // All the input field renders properly and have empty string as value
    expect(usernameInput.value).toEqual('');
    expect(emailInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');
    expect(passswordConfirmationInput.value).toEqual('');

    // signup buton is there
    expect(button.textContent).toEqual('Sign Up');

    // Alert element is not renders
    expect(alert).toBeNull();
  });

  it('shows error when all fields are empty and user submit the form', async () => {
    // Alert element is not renders
    expect(screen.queryByTestId('alert-element')).toBeNull();

    // Click signup button
    userEvent.click(screen.getByRole('button'));

    // Alert element is displayed with an error
    expect(screen.queryByTestId('alert-element')).not.toBeNull();
    expect(screen.queryByTestId('alert-element').textContent).toEqual(
      'All field are required!'
    );
  });

  it('shows error when one field is empty and user submit the form', async () => {
    fillForm();

    // Alert element is not renders
    expect(screen.queryByTestId('alert-element')).toBeNull();

    // set username to empty string
    userEvent.clear(usernameInput);
    expect(usernameInput.value).toEqual('');

    // Click signup button
    userEvent.click(button);

    // Alert element is displayed with an error
    expect(screen.queryByTestId('alert-element')).not.toBeNull();
    expect(screen.queryByTestId('alert-element').textContent).toEqual(
      'All field are required!'
    );

    fillForm();

    // Alert element is hidden again
    expect(screen.queryByTestId('alert-element')).toBeNull();

    // set email to empty string
    userEvent.clear(emailInput);
    expect(emailInput.value).toEqual('');

    // Click signup button
    userEvent.click(button);

    // Alert element is displayed with an error
    expect(screen.queryByTestId('alert-element')).not.toBeNull();
    expect(screen.queryByTestId('alert-element').textContent).toEqual(
      'All field are required!'
    );
  });

  it('Shows errors when passwords do not match', () => {
    fillForm();
    userEvent.type(passwordInput, 'some password');

    // Click signup button
    userEvent.click(screen.getByRole('button'));

    // Alert element is displayed with an error saying the password are not matching
    alert = screen.queryByTestId('alert-element');
    expect(alert).toBeDefined();
    expect(alert.textContent).toEqual('Passwords are not matching!');
  });

  const fillForm = () => {
    userEvent.type(usernameInput, 'jonathan');
    userEvent.type(emailInput, 'jonathan@gmail.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(passswordConfirmationInput, 'password');
  };
});
