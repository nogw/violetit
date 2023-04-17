import { render, cleanup, screen, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import { WithProviders } from '../../../../test/Providers';
import SignIn from '../signin';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SignIn Page', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mockRouter.setCurrentUrl('/auth/signin');
  });

  it('should navigate to /feed after signin correctly the user', async () => {
    const environment = createMockEnvironment();

    render(<WithProviders relayEnvironment={environment}>{<SignIn queryRefs={{}} />}</WithProviders>);

    const variables = {
      email: 'noge@gmail.com',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables).toMatchObject({ input: variables });
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          UserLoginPayload: () => ({
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

    render(<WithProviders relayEnvironment={environment}>{<SignIn queryRefs={{}} />}</WithProviders>);

    const variables = {
      email: 'wrongemail',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('should keep the button disabled if the password is not correct', async () => {
    const environment = createMockEnvironment();

    render(<WithProviders relayEnvironment={environment}>{<SignIn queryRefs={{}} />}</WithProviders>);

    const variables = {
      email: 'wrongemail',
      password: 'pw',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());
  });

  it('should display a generic error from server', async () => {
    const environment = createMockEnvironment();

    render(<WithProviders relayEnvironment={environment}>{<SignIn queryRefs={{}} />}</WithProviders>);

    const variables = {
      email: 'noge@gmail.com',
      password: 'awesomepassword',
    };

    await waitFor(() => expect(screen.getByRole('button')).toBeDisabled());

    await userEvent.type(screen.getByPlaceholderText('Email'), variables.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), variables.password);

    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      const operation = environment.mock.getMostRecentOperation();
      expect(operation.request.variables).toMatchObject({ input: variables });
      environment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation, {
          UserLoginPayload: () => ({
            error: {
              field: 'Some error field',
              message: 'Some error message',
            },
          }),
        }),
      );
    });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({ pathname: '/auth/signin' });
    });
  });
});
