import React from 'react';
import LoginPage from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('login tests', () => {
  let emailInput;
  let passwordInput;
  let button;
  let alert;

  beforeEach(() => {
    // Render the component and initialize element before each test.
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    emailInput = screen.getByPlaceholderText('Email');
    passwordInput = screen.getByPlaceholderText('Password');
    button = screen.getByRole('button');
    alert = screen.queryByTestId('alert-element');
  });

  it('renders properly on initial render', async () => {
    // All the input field renders properly and have empty string as value
    expect(emailInput.value).toEqual('');
    expect(passwordInput.value).toEqual('');

    // signup buton is there
    expect(button.textContent).toEqual('Log In');

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
    userEvent.clear(emailInput);
    expect(emailInput.value).toEqual('');
    
    // Click login button
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

    // Click login button
    userEvent.click(button);

    // Alert element is displayed with an error
    expect(screen.queryByTestId('alert-element')).not.toBeNull();
    expect(screen.queryByTestId('alert-element').textContent).toEqual(
      'All field are required!'
    );
  });

  //TODO: Add submit form test
  it('submits form when form is valid and button clicked', () => {});

  const fillForm = () => {
    userEvent.type(emailInput, 'solbi@gmail.com');
    userEvent.type(passwordInput, 'password');
  };
});
