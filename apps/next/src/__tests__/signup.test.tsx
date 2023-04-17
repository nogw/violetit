import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { WithProviders } from '../../test/Providers';
import SignUp from '../pages/auth/signup';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SignUp Page', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mockRouter.setCurrentUrl('/auth/signup');
  });

  it('should navigate to /feed after signup correctly the user', async () => {
    const environment = createMockEnvironment();

    render(
      <WithProviders relayEnvironment={environment}>
        <SignUp queryRefs={{}} />
      </WithProviders>,
    );

    const variables = {
      username: 'nogenoge',
      email: 'noge@gmail.com',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Username'), variables.username);
    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);
    await userEvent.type(screen.getByPlaceholderText('Password Confirm'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables).toMatchObject({ input: variables });
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          UserRegisterPayload: () => ({
            error: null,
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({ pathname: '/' });
    });
  });

  it('should keep the button disabled if the e-mail is not correct', async () => {
    const environment = createMockEnvironment();

    render(
      <WithProviders relayEnvironment={environment}>
        <SignUp queryRefs={{}} />
      </WithProviders>,
    );

    const variables = {
      username: 'nogenoge',
      email: 'wrongemail',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    const emailInputElement = screen.getByPlaceholderText('Email');

    await userEvent.click(emailInputElement);
    await waitFor(() => emailInputElement.blur());

    expect(screen.getByTestId('error-message-email')).toHaveTextContent('Email is required');

    await userEvent.type(screen.getByPlaceholderText('Username'), variables.username);
    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);
    await userEvent.type(screen.getByPlaceholderText('Password Confirm'), variables.password);

    expect(screen.getByTestId('error-message-email')).toHaveTextContent('Invalid email');

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('disables sign-up button if password is incorrect', async () => {
    const env = createMockEnvironment();

    render(
      <WithProviders relayEnvironment={env}>
        <SignUp queryRefs={{}} />
      </WithProviders>,
    );

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    const passwordInputElement = screen.getByPlaceholderText('Password');

    await userEvent.click(passwordInputElement);
    await waitFor(() => passwordInputElement.blur());

    expect(screen.getByTestId('error-message-password')).toHaveTextContent('Password is required');

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('keeps sign-up button disabled if password confirmation does not match', async () => {
    const environment = createMockEnvironment();

    render(
      <WithProviders relayEnvironment={environment}>
        <SignUp queryRefs={{}} />
      </WithProviders>,
    );

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Password'), 'validpassword');
    await userEvent.type(screen.getByPlaceholderText('Password Confirm'), 'differentpassword');

    await waitFor(() => screen.getByPlaceholderText('Password Confirm').blur());
    expect(screen.getByTestId('error-message-passwordConfirm')).toHaveTextContent('Passwords must match');

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('should display a generic error from server', async () => {
    const environment = createMockEnvironment();

    render(
      <WithProviders relayEnvironment={environment}>
        <SignUp queryRefs={{}} />
      </WithProviders>,
    );

    const variables = {
      username: 'nogenoge',
      email: 'noge@gmail.com',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Username'), variables.username);
    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);
    await userEvent.type(screen.getByPlaceholderText('Password Confirm'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables).toMatchObject({ input: variables });
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          UserRegisterPayload: () => ({
            error: {
              field: 'Some error field',
              message: 'Some error message',
            },
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({ pathname: '/auth/signup' });
    });
  });
});
